import { organism } from "./base";
import { hypothalamus } from "./hypothalamus";
import { error, debug, info } from "./log";
import { Hormone, Transport } from "./types";

function isDefaultValue<T>(
  defaultValueOrTransformation?: T | ((value: T) => void)
): defaultValueOrTransformation is T {
  return (
    defaultValueOrTransformation !== undefined &&
    !(defaultValueOrTransformation instanceof Function)
  );
}

type HormoneOptions<T> = {
  defaultValue?: T;
  transformation?: (value: T) => void;
  readOnce?: boolean;
  loadIfExists?: boolean;
};

export function defineSingleHormone<T>(
  name: string,
  options: HormoneOptions<T> = {}
): Hormone<T> {
  return defineHormone(name, {...options, readOnce: true})
}

export function defineHormone<T>(
  name: string,
  options: HormoneOptions<T> = {}
): Hormone<T> {
  if (organism[name] && !options.loadIfExists) {
    error("hormone.defineHormone", new Error("Hormone already created"), name);
    throw new Error("Hormone already created");
  } else if (organism[name] && options.loadIfExists) {
    debug(
      "hormone.defineHormone",
      "Hormone already created, reusing existing",
      name
    );
    return { name };
  }

  const { defaultValue, transformation, readOnce } = options;

  organism[name] = {
    name,
    value: defaultValue,
    defaultValue,
    transformation,
    receptors: [],
    readOnce: readOnce ?? false,
  };

  return { name };
}

export async function releaseHormone<T>(
  { name }: Hormone<T>,
  value?: T
): Promise<Transport<T>>;
export async function releaseHormone<T>(
  { name }: Hormone<T>,
  onRelease: (values: T) => T
): Promise<Transport<T>>;

export async function releaseHormone<T>(
  hormone: Hormone<T>,
  value?: T | ((values: T) => T)
) {
  if (!hormone) {
    error("hormone.releaseHormone", new Error("Hormone cannot be undefined"));
    throw new Error("Hormone cannot be undefined");
  }

  const {name} = hormone;
  if (!organism[name]) {
    error("hormone.releaseHormone", new Error("Hormone does not exist"), name);
    throw new Error("Hormone does not exist");
  }

  if (isDefaultValue(value)) {
    organism[name].value = value;
  } else {
    organism[name].value =
      !value ? value : value(organism[name].value);
  }
  
  info(
    "hormone.releaseHormone",
    "Releasing passed hormone",
    name,
    organism[name].value
  );
  const { receptors, transformation } = organism[name];

  transformation && transformation(organism[name].value);
  const _value = organism[name].value
  hypothalamus.orchestrate({ name }, _value);
  
  await Promise.all(
    receptors.filter((receptor) => {
      const keep = receptor.onlyIf === undefined || receptor.onlyIf(_value);
      debug(
        "hormone.releaseHormone",
        !keep
          ? "Filtered receptor from the triggers because condition not matched"
          : "Keeping receptor because condition matched or no condition",
        receptor
      );
      return keep;
    }).map((receptor) => receptor?.onTriggered ? receptor?.onTriggered(_value) : _value)
  );
  if (organism[name].readOnce) {
    debug(
      "hormone.releaseHormone",
      "Resetting hormone because it is readOnce",
      name
    );
    organism[name].value = organism[name].defaultValue;
  }

  return { ...organism[name] };
}
