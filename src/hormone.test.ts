import { defineHormone, releaseHormone } from "./hormone";
import { organism } from "./base";
import { testableLitElement } from "./testHelpers";

type ExampleHormone = boolean;
const onTriggered = jest.fn()

describe("Create Hormone", () => {
  it("doesn't allow defining a hormone twice", () => {
    defineHormone<ExampleHormone>("example");
    expect(() => defineHormone<ExampleHormone>("example")).toThrowError();
  });
  it("allows defining a hormone twice if I explictly ask for it, though it would create it but only not fail the second time", () => {
    const hormone = defineHormone<ExampleHormone>("example");
    expect(() => defineHormone<ExampleHormone>("example", { loadIfExists: true })).not.toThrowError();
    expect(hormone).toEqual(defineHormone<ExampleHormone>("example", { loadIfExists: true }))
  });

  it("define a hormone with the correct parameters", () => {
    const hormone1 = defineHormone<ExampleHormone>("example1");
    expect(organism[hormone1.name].value).toBeUndefined();

    const hormone2 = defineHormone<ExampleHormone>("example2", {
      defaultValue: true,
    });
    expect(organism[hormone2.name].value).toBe(true);
    const transformation = () => null;

    const hormone3 = defineHormone<ExampleHormone>("example3", {
      transformation,
    });
    expect(organism[hormone3.name].transformation).toBe(transformation);
    expect(organism[hormone3.name].value).toBeUndefined();

    const hormone4 = defineHormone<ExampleHormone>("example4", {
      transformation,
      defaultValue: true,
    });
    expect(organism[hormone4.name].transformation).toBe(transformation);
    expect(organism[hormone4.name].value).toBe(true);
  });
});

describe("Release Hormone", () => {
  it("fails if a hormone does not exist", async () => {
    expect(releaseHormone({ name: "example" })).rejects.toBeDefined();
  });

  it("notifies a receptor if released", async () => {
    // Given
    const litElement = testableLitElement();
    const hormone = defineHormone<ExampleHormone>("example");
    organism["example"].receptors.push({
      parent: litElement,
      key: "example",
      onTriggered
    });

    // When
    await releaseHormone(hormone);

    // Then
    expect(onTriggered).toBeCalledTimes(1);
  });

  it("calls the transformation if one is defined", async () => {
    // Given
    const transformation = jest.fn();
    const hormone = defineHormone<ExampleHormone>("example", {
      transformation: (value) => transformation(value),
    });

    // When
    await releaseHormone(hormone);

    // Then
    expect(transformation).toBeCalledTimes(1);
  });

  it("sets the value if one is defined", async () => {
    // Given
    const transformation = jest.fn();
    const hormone = defineHormone<ExampleHormone>("example", {
      transformation: (value) => transformation(value),
    });

    // When
    await releaseHormone(hormone, true);

    // Then
    expect(transformation).toBeCalledWith(true);
  });

  it("applies the value if one is defined", async () => {
    // Given
    const transformation = jest.fn();
    const hormone = defineHormone<ExampleHormone[]>("example", {
      transformation: (value) => transformation(value),
      defaultValue: [false],
    });

    // When
    await releaseHormone(hormone, (values) => [...values, true]);

    // Then
    expect(transformation).toBeCalledWith([false, true]);
  });
});

describe("Release single Hormone", () => {
  
  it("resets it to the default after called", async () => {
    // Given
    const hormone = defineHormone<ExampleHormone>("example", {
      defaultValue: false,
      readOnce: true,
    });

    // When
    await releaseHormone(hormone, true);

    // Then
    expect(organism.example.value).toBe(false);
  });

  it("resets it to undefined after called if no default value specified", async () => {
    // Given
    const hormone = defineHormone<ExampleHormone>("example", {
      readOnce: true,
    });

    // When
    await releaseHormone(hormone, true);

    // Then
    expect(organism.example.value).toBe(undefined);
  });
});
