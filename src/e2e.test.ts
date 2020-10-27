import { screen } from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";
import { pureLit } from "pure-lit";
import { html } from "lit-element";
import userEvent from "@testing-library/user-event";
import { useReceptor, releaseHormone } from ".";
import { Hormone } from "./types";
import { defineHormone } from "./hormone";
import { hypothalamus } from "./hypothalamus";
import { LitLikeElement } from "./testHelpers";
import { useState } from "lit-element-state-decoupler";

describe(`Given I have a component
And the component has a receptor`, () => {
  let hormone: Hormone<boolean> = defineHormone("test", {
    defaultValue: false,
  });

  beforeEach(async () => {
    hormone = defineHormone("test", { defaultValue: false });
    pureLit("organic-e2e-with-receptor", (el: LitLikeElement) => {
      const state = useState(el, false)
      useReceptor(el, hormone, async (value) => state.publish(value));
      return html`<div>Receptor: ${state.getState()}</div>`;
    });
    await fixture("<organic-e2e-with-receptor></organic-e2e-with-receptor>");
  });

  it("shows the default value", async () => {
    expect(await screen.findByText(/Receptor: false/gi)).toBeDefined();
  });

  describe(`
    When the hormone is released`, () => {
    beforeEach(async () => {
      await releaseHormone(hormone, true);
    });

    it("updates the component", async () => {
      expect(await screen.findByText(/Receptor: true/gi)).toBeDefined();
    });
  });
});

describe(`Given I have a component
And one of the components has a receptor with a filter`, () => {
  let hormone: Hormone<boolean>;
  const rerender = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();
    hormone = defineHormone("test", { defaultValue: false });
    pureLit("organic-e2e-with-filter", (el: LitLikeElement) => {
      const state = useState(el, false)

      useReceptor(el, hormone, (val) => val, async val => state.publish(val));
      rerender();
      return html`<div>Receptor: ${state.getState()}</div>`;
    });
    await fixture("<organic-e2e-with-filter></organic-e2e-with-filter>");
  });

  it("renders the component", () => {
    expect(rerender).toBeCalledTimes(1);
  });

  describe(`When a hormon is released that matches the filter`, () => {
    beforeEach(() => {
      releaseHormone(hormone, true);
    });

    it("rerenders the component", () => {
      expect(rerender).toBeCalledTimes(2);
    });
  });

  describe(`When a hormon is released that does not match the filter`, () => {
    beforeEach(() => {
      releaseHormone(hormone, false);
    });

    it("does not rerender the component", () => {
      expect(rerender).toBeCalledTimes(1);
    });
  });
});

describe(`Given I have a hypothalamus
And one of the components has a receptor for Prolactin
And one of the components has a receptor for Oxytocin
And the hypothalamus releases Oxytocin when Prolactin is received`, () => {
  let prolactin: Hormone<boolean>;
  let oxytocin: Hormone<boolean>;
  beforeEach(async () => {
    prolactin = defineHormone("prolactin", { defaultValue: false });
    oxytocin = defineHormone("oxytocin", { defaultValue: false });
    pureLit("organic-e2e-with-receptor-prolactin", (el: LitLikeElement) => {
      const state = useState(el, false)
      useReceptor(el, prolactin, async val => state.publish(val));
      return html`<div>Prolactin received: ${state.getState()}</div>`;
    });
    pureLit("organic-e2e-with-receptor-oxytocin", (el: LitLikeElement) => {
      const state = useState(el, false)
      useReceptor(el, oxytocin, async val => state.publish(val));
      return html`<div>Oxytocin received: ${state.getState()}</div>`;
    });

    hypothalamus.on(prolactin, (value) => releaseHormone(oxytocin, value));

    await fixture(`
        <organic-e2e-with-receptor-prolactin></organic-e2e-with-receptor-prolactin>
        <organic-e2e-with-receptor-oxytocin></organic-e2e-with-receptor-oxytocin>
        `);
  });

  it("shows the default values", async () => {
    expect(
      await screen.findByText(/Prolactin received: false/gi)
    ).toBeDefined();
    expect(await screen.findByText(/Oxytocin received: false/gi)).toBeDefined();
  });

  describe(`
    When the hormone is released`, () => {
    beforeEach(async () => {
      await releaseHormone(prolactin, true);
    });

    it("has received the Oxytocin", async () => {
      expect(
        await screen.findByText(/Oxytocin received: true/gi)
      ).toBeDefined();
    });
  });
});

describe(`Given I have multiple components
And one of the components has a receptor for Prolactin
And one of the components has a receptor for Oxytocin
And one of the components has a hormone releaser for Oxytocin`, () => {
  beforeEach(async () => {
    const prolactin = defineHormone("prolactin", { defaultValue: false });
    const oxytocin = defineHormone("oxytocin", { defaultValue: false });

    pureLit("organic-e2e-with-receptor-prolactin", (el: LitLikeElement) => {
      const state = useState(el, false)
      useReceptor(el, prolactin, async val => state.publish(val));
      return html`<div>Prolactin received: ${state.getState()}</div>`;
    });
    pureLit("organic-e2e-with-receptor-oxytocin", (el: LitLikeElement) => {
      const state = useState(el, false)
      useReceptor(el, oxytocin, async val => state.publish(val));
      return html`<div>Oxytocin received: ${state.getState()}</div>`;
    });
    pureLit("organic-e2e-with-releaser-oxytocin", () => {
      return html`<button @click="${() => releaseHormone(oxytocin, true)}"></button>`;
    });

    await fixture(`
        <organic-e2e-with-receptor-prolactin></organic-e2e-with-receptor-prolactin>
        <organic-e2e-with-receptor-oxytocin></organic-e2e-with-receptor-oxytocin>
        <organic-e2e-with-releaser-oxytocin></organic-e2e-with-releaser-oxytocin>
        `);
  });

  it("shows the default values", async () => {
    expect(
      await screen.findByText(/Prolactin received: false/gi)
    ).toBeDefined();
    expect(await screen.findByText(/Oxytocin received: false/gi)).toBeDefined();
  });

  describe(`
    When the hormone is released`, () => {
    beforeEach(async () => {
      userEvent.click(await screen.findByRole("button"));
    });

    it("has received the Oxytocin", async () => {
      expect(
        await screen.findByText(/Oxytocin received: true/gi)
      ).toBeDefined();
    });
    it("hasn't received the Prolactin", async () => {
      expect(screen.queryByText(/Prolactin received: true/gi)).toBeNull();
    });
  });
});
