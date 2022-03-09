import { screen, waitFor } from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";
import userEvent from "@testing-library/user-event";
import { html } from "lit";
import { pureLit } from "pure-lit";
import { InputTriggerBehaviour } from "..";
import {
  Hormone,
  defineHormone,
  releaseHormone,
  useReceptor,
} from "../../../src";

import "./Input";
import { LitElement } from "lit";
import { FormElementHoromoneValue, FormProps } from "../types";
import { defineSingleHormone } from "../../../src";
import { useState } from "lit-element-state-decoupler";

describe("Input", () => {
  describe("When triggered on form submit", () => {
    let hormoneToReleaseInputValue: Hormone<FormElementHoromoneValue>;
    let hormoneToTriggerSubmit: Hormone<FormProps>;

    beforeEach(async () => {
      const form = "form";
      hormoneToReleaseInputValue = defineHormone<FormElementHoromoneValue>(
        "test/inputValue",
        { defaultValue: { form, value: "", name: "" } }
      );
      hormoneToTriggerSubmit = defineSingleHormone<string>("test/onSubmit");

      pureLit("trigger-on-form-submit", (el: LitElement) => {
        const result = useState(el, {value: ""})
        useReceptor(el, hormoneToReleaseInputValue, async val => result.publish(val));
        return html`<div data-testid="result">${result.getState().value}</div>
          <component-atom-input
            name="name"
            label="label}"
            placeholder="placeholder}"
            form="${form}"
            clear
            .triggers=${[InputTriggerBehaviour.OnSubmit]}
            .release=${hormoneToReleaseInputValue}
            .receptor=${hormoneToTriggerSubmit}
          ></component-atom-input>
          <button
            form="${form}"
            @click=${() => releaseHormone(hormoneToTriggerSubmit, { form })}
          >
            <slot></slot>
          </button>`;
      });
      await fixture("<trigger-on-form-submit></trigger-on-form-submit>");
    });

    xit("releases the specified horomone", async () => {
      await userEvent.type(screen.getByRole("textbox"), "hello world");
      userEvent.click(screen.getByRole("button"));
      await waitFor(() => screen.getByText("hello world"));
      expect(screen.getByTestId("result").innerHTML).toContain("hello world")
    });
    xit("clears the textbox", async () => {
      await userEvent.type(screen.getByRole("textbox"), "hello world");
      userEvent.click(screen.getByRole("button"));
      await waitFor(() => screen.getByText("hello world"));
      expect((screen.getByRole("textbox") as any).value).toContain("")
    });
  });
  
});
