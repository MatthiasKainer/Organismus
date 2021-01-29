import { defineHormone, Organismus, releaseHormone } from ".";
import { useReceptor } from "./receptor";
import { testableLitElement } from "./testHelpers";

type ExampleHormone = boolean;
const onTriggered = jest.fn()

describe("scoped organismus", () => {
    it("notifies only the global receptor if released", async () => {
      // Given we have a hormone in the global scope
      const litElement = testableLitElement();
      const hormone = defineHormone<ExampleHormone>("example");
      useReceptor(litElement, { "name": "example" }, onTriggered)
      // And we gave the same hormone in the local scope
      const scope = Organismus()
      scope.defineHormone<ExampleHormone>("example");
      scope.useReceptor(litElement, { "name": "example" }, onTriggered)
  
      // When
      await releaseHormone(hormone);
  
      // Then
      expect(onTriggered).toBeCalledTimes(1);
    });

    it("notifies only the scoped receptor if released", async () => {
      // Given we have a hormone in the global scope
      const litElement = testableLitElement();
      const hormone = defineHormone<ExampleHormone>("example");
      useReceptor(litElement, { "name": "example" }, onTriggered)
      // And we gave the same hormone in the local scope
      const scope = Organismus()
      scope.defineHormone<ExampleHormone>("example");
      scope.useReceptor(litElement, { "name": "example" }, onTriggered)
  
      // When
      await scope.releaseHormone(hormone);
  
      // Then
      expect(onTriggered).toBeCalledTimes(1);
    });
  
  })