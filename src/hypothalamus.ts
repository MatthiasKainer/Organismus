import { error, debug, info } from "./log";
import {
  Hormone,
  HormoneActionQueue,
  HormoneDictionary,
  HormoneResultList,
} from "./types";

const hormoneActionQueue: HormoneActionQueue = {
  queue: {},
  list: {},
};

export function getValue<T>(hormone: Hormone<T>, values: HormoneResultList): T {
  return values[hormone.name] as T
}

export function getId(hormone: Hormone<any>[]) {
  return hormone.reduce((prev, curr) => `${prev};${curr.name};`, "");
}

class Hypothalamus {
  actionDictionary: HormoneDictionary = {};

  on<T>(hormone: Hormone<T>, release: (value: T) => void): void;
  on<T>(
    hormone: Hormone<any>[],
    release: (value: { [hormoneName: string]: any }) => void
  ): void;
  on<T>(
    hormone: Hormone<T> | Hormone<any>[],
    release: (value: { [hormoneName: string]: any }) => void
  ) {
    if (Array.isArray(hormone)) {
      const id = getId(hormone);
      if (hormoneActionQueue.list[id]) {
        error("Hypothalamus.on", new Error("Cannot register the same list of hormones twice"), id)
        throw new Error("Cannot register the same list of hormones twice");
      }
      info("[Hypothalamus.on] Adding new action when all in a list of hormones are released", id, hormone)
      hormoneActionQueue.list[id] = {
        hormones: [...hormone],
        callback: release,
      };
    } else {
      info("Hypothalamus.on", "Adding new action when a hormone is released", hormone.name)
      this.actionDictionary[hormone.name] =
        this.actionDictionary[hormone.name] || [];
      this.actionDictionary[hormone.name].push(release);
    }
  }

  drop<T>(hormone: Hormone<T>): void;
  drop<T>(hormone: Hormone<any>[]): void;
  drop<T>(hormone: Hormone<T> | Hormone<any>[]) {
    if (Array.isArray(hormone)) {
      debug("Hypothalamus.drop", "Dropping a list of hormones", getId(hormone), hormone)
      delete hormoneActionQueue.queue[getId(hormone)];
      delete hormoneActionQueue.list[getId(hormone)];
    } else {
      debug("Hypothalamus.drop", "Dropping a hormone", hormone.name)
      this.actionDictionary[hormone.name] = [];
    }
  }
  dropAll(): void {
    debug("Hypothalamus.dropAll", "Dropping all hormones")
    this.actionDictionary = {};
    hormoneActionQueue.queue = {};
    hormoneActionQueue.list = {};
  }

  collect<T>(
    allOf: Hormone<T>,
    triggerOn: Hormone<T>,
    release: (value: { [hormoneName: string]: any }) => void) {
    const id = `collect;;${allOf.name};${triggerOn.name};`

    if (hormoneActionQueue.list[id]) {
      error("Hypothalamus.collect", new Error("Cannot register the same list of hormones twice"), id)
      throw new Error("Cannot register the same list of hormones twice");
    }
    info("[Hypothalamus.collect] Adding new action when collected hormones are released", id, allOf, triggerOn)
    hormoneActionQueue.list[id] = {
      hormones: [triggerOn],
      callback: release,
    };
  }

  orchestrate<T>(hormone: Hormone<T>, value: T) {
    this.actionDictionary[hormone.name] &&
      this.actionDictionary[hormone.name].forEach((h) => h(value));
    const queuedItems = Object.keys(hormoneActionQueue.queue).filter(
      (key) => key.includes(`;${hormone.name};`)
    );

    // add new items to queue
    const newItems = Object.keys(hormoneActionQueue.list).filter(
      (key) =>
        key.indexOf(`;${hormone.name};`) > -1 &&
        queuedItems.every((queue) => queue !== key)
    );
    newItems.forEach((additional) => {
      hormoneActionQueue.queue[additional] = {
        hormones: [...hormoneActionQueue.list[additional].hormones],
        values: {},
        callback: hormoneActionQueue.list[additional].callback,
      };
    });
    const items = [...new Set([...queuedItems, ...newItems])];

    // remove called hormones from queue
    for (let index = 0; index < items.length; index++) {
      const key = items[index];
      if (key.startsWith("collect;;")) {
        const [allOf] = key.replace("collect;;", "").split(";");
        if (hormone.name === allOf) {
          hormoneActionQueue.queue[key].values[hormone.name] = [
            ...(hormoneActionQueue.queue[key].values[hormone.name] || []),
            value
          ];
        } else {
          hormoneActionQueue.queue[key].values[hormone.name] = value;
          hormoneActionQueue.queue[key].callback(
            hormoneActionQueue.queue[key].values
          );
          delete hormoneActionQueue.queue[key];
        }
      }
      else {
        hormoneActionQueue.queue[key].hormones = hormoneActionQueue.queue[
          key
        ].hormones.filter((current) => current.name !== hormone.name);
        hormoneActionQueue.queue[key].values[hormone.name] = value;
        if (hormoneActionQueue.queue[key].hormones.length < 1) {
          hormoneActionQueue.queue[key].callback(
            hormoneActionQueue.queue[key].values
          );
          delete hormoneActionQueue.queue[key];
        }
      }
    }
  }
}

export const hypothalamus = new Hypothalamus();
