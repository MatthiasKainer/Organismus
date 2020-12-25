import { Parent, Hormone } from "./types";
import { organism } from "./base";
import { error, trace, info } from "./log";

const newReceptor = <T>(
  parent: Parent,
  name: string,
  onlyIf?: (value: T) => boolean
) => {
  const key = onlyIf?.toString() || name
  return !organism[name].receptors.some(
    (receptor) =>
      receptor.parent === parent &&
      receptor.key === key
  );
}
export function useReceptor<T>(
  parent: Parent,
  { name }: Hormone<T>,
  onTriggered: (value: T) => Promise<void | unknown>
): void;
export function useReceptor<T>(
  parent: Parent,
  { name }: Hormone<T>,
  onlyIf: (value: T) => boolean,
  onTriggered: (value: T) => Promise<void | unknown>
): void;
export function useReceptor<T>(
  parent: Parent,
  { name }: Hormone<T>,
  onlyIfOrOnTriggered: (value: T) => boolean | Promise<void | unknown>,
  emptyOrOnTriggered?: (value: T) => Promise<void | unknown>
): void {
  const onTriggered =
    emptyOrOnTriggered ?? (onlyIfOrOnTriggered as (value: T) => Promise<void>);
  const onlyIf: ((value: T) => boolean) | undefined = emptyOrOnTriggered
    ? (onlyIfOrOnTriggered as (value: T) => boolean)
    : undefined;
  if (!organism[name]) {
    error("receptor.useReceptor", new Error(`Hormone is not defined`), name);
    throw new Error(`Hormone "${name}" is not defined`);
  }

  if (newReceptor(parent, name, onlyIf)) {
    info("receptor.useReceptor", "Pushing new receptor to hormone", name, {
      parent,
    });
    organism[name].receptors.push({
      key: onlyIf?.toString() || name,
      parent,
      onlyIf,
      onTriggered,
    });
    organism[name].value !== undefined ? onTriggered(organism[name].value) :
    organism[name].defaultValue !== undefined && onTriggered(organism[name].defaultValue)
  } else {
    trace(
      "receptor.useReceptor",
      "Receptor not pushed because already subscribed",
      name,
      { parent }
    );
  }
}
