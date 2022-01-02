import { screen, waitFor } from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";
import userEvent from "@testing-library/user-event";
import { html } from "lit-html";
import { pureLit } from "pure-lit";
import { InputTriggerBehaviour } from "..";
import { Hormone, defineHormone, useReceptor } from "../../../src";

import "./Input";
import { LitElement } from "lit-element";
import { FormElementHoromoneValue } from "../types";
import { useState } from "lit-element-state-decoupler";

describe("Input", () => {
  describe("When triggered on enter", () => {
    let hormoneToReleaseInputValue: Hormone<FormElementHoromoneValue>;

    beforeEach(async () => {
      const form = "form";
      hormoneToReleaseInputValue = defineHormone<FormElementHoromoneValue>(
        "test/inputValueWithEnter",
        { defaultValue: { form, value: "", name: "" } }
      );

      pureLit("trigger-on-enter", (el: LitElement) => {
        const result = useState(el, {value: ""})
        useReceptor(el, hormoneToReleaseInputValue, async val => result.publish(val));
        return html`<div data-testid="result">${result.getState().value}</div>
          <component-atom-input
            name="name"
            label="label}"
            placeholder="placeholder}"
            form="${form}"
            clear
            .triggers=${[InputTriggerBehaviour.OnEnter]}
            .release=${hormoneToReleaseInputValue}
          ></component-atom-input>`;
      });
      await fixture("<trigger-on-enter></trigger-on-enter>");
      await userEvent.type(screen.getByRole("textbox"), "hello world{enter}");
    });

    xit("releases the specified horomone", async () => {
      await waitFor(() => screen.getByText("hello world"));
      expect(screen.getByTestId("result").innerHTML).toContain("hello world");
    });

    xit("clears the textbox", async () => {
      expect((screen.getByRole("textbox") as any).value).toContain("");
    });
  });
});
