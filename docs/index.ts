import { css, html } from "lit-element";
import { pureLit } from "pure-lit";
import { defineHormone, LOGLEVEL, setLoglevel } from "../src";

const getHashValue = (key: string, orElse = "") => {
  const { hash } = document.location;
  if (hash.length < 1 || hash.indexOf(key) < 0) {
    return orElse;
  }

  const values = hash
    .substr(1)
    .split("&")
    .map((value) => value.split("="))
    .find(([actualKey]) => actualKey === key);
  if (!values) return orElse;
  const [, value] = values;
  return value;
};

const loglevel = (): LOGLEVEL => {
  const value = getHashValue("loglevel", "error");
  switch (value.toLowerCase()) {
    case "info":
      return LOGLEVEL.INFO;
    case "debug":
      return LOGLEVEL.DEBUG;
    case "trace":
      return LOGLEVEL.TRACE;
  }

  return LOGLEVEL.ERROR;
};

setLoglevel(loglevel());

export * from "./simple";
export * from "./twoForms";
export * from "./todo";
export * from "./search";
export * from "./form";
export * from "./spreadsheet";

const activePanel = defineHormone<string>("app/panel", {
  defaultValue: "readme",
});
export default pureLit(
  "example-app",
  () => {
    return html`
      <header>
        <component-button-list
          .items=${[
            "readme",
            "simple",
            "two-receptors",
            "todo",
            "search",
            "form",
            "spreadsheet",
          ]}
          .release=${activePanel}
        >
        </component-button-list>
      </header>
      <component-toggle-panel name="readme" .receptor=${activePanel}>
        <html-view file="readme"></html-view>
      </component-toggle-panel>
      <component-toggle-panel name="simple" .receptor=${activePanel}>
        <blockquote>
          A receptor does not return a global state, but what has been returned.
        </blockquote>
        <div>
          <div>
            <simple-app></simple-app>
          </div>
          <div>
            <code-view file="simple.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>

      <component-toggle-panel name="two-receptors" .receptor=${activePanel}>
        <blockquote>
          A receptor does not return a global state, but what has been released
          last. That might be counterintuitive if you compare it to state hooks
          like
          <code>useState</code>, but the reason is that a receptor really is the
          result of a hormone that was released. If you want to maintain the
          state, you will have to maintain it inside the component.
        </blockquote>
        <blockquote>
          A receptor that is explicitly filtered for a released hormone will
          always return undefined. In case you want to maintain your own state
          use this to know when the state changes.
        </blockquote>
        <div>
          <div>
            <two-form-app></two-form-app>
          </div>
          <div>
            <code-view file="twoForms.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="todo" .receptor=${activePanel}>
        <blockquote>
          A simple todo app, that adds new items to a list. Unlike the first
          examples, this one uses a component library that is setup to work out
          of the box with hormones.
        </blockquote>
        <div>
          <div>
            <todo-app></todo-app>
          </div>
          <div>
            <code-view file="todo.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="search" .receptor=${activePanel}>
        <blockquote>
          A search app, that loads a json result, filters it in the frontend and
          displays the result.
        </blockquote>
        <blockquote>
          This example is aiming to show how you can completely separate
          specific parts of your logic without any connection to the display or
          the rendering of the application.
        </blockquote>
        <div>
          <div>
            <search-app></search-app>
          </div>
          <div>
            <code-view file="search.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="form" .receptor=${activePanel}>
        <blockquote>
          This example contains form that can be submitted at the end.
        </blockquote>
        <blockquote>
          <code>organic-lit</code> was not designed to solve forms, however
          there are multiple ways to solve form handling with it. This is one
          example, which is using the hypothalamus for collecting the form data
          and to orchestrate the validation and finally the submit.
        </blockquote>
        <div>
          <div>
            <form-app></form-app>
          </div>
          <div>
            <code-view file="form.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="spreadsheet" .receptor=${activePanel}>
        <blockquote>
          The best results can be achieved with applications that have a lot of
          decoupled elements that might be related. A typical use case is a
          spreadsheet.
        </blockquote>
        <blockquote>
          This spreadsheet shows a multiway communication:
          <ol>
            <li>
              Every cell releases a <code>cellChanged</code> hormone if changed.
              A cell with a formula listens to those events, and if one of the
              referenced cells is changed, it updates itself
            </li>
            <li>
              Every cell with a formula releases a
              <code>cellRequest</code> hormone for all cells with values it
              needs, triggering a <code>cellChanged</code> event for the
              affected cells, and read from 1.
            </li>
            <li>
              Every cell listens to a <code>cellSet</code> event, which allows
              setting events from the outside (by clicking the init button)
            </li>
          </ol>
        </blockquote>
        <blockquote>
          This is a very simple implementation, and formula's (which start with
          <code>=</code>) only support selecting single columns (no numerics or
          ranges) and <code>+</code> & <code>-</code> operators (ie
          <code>=A1+A2</code>). Click <em>Init example</em> for an example where
          2 fields listen to changes in over a hundred different fields.
        </blockquote>
        <div>
          <div>
            <spreadsheet-app></spreadsheet-app>
          </div>
          <div>
            <code-view file="spreadsheet.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
    `;
  },
  {
    styles: [
      css`
        header {
          position: fixed;
        }
        component-toggle-panel div {
          display: flex;
          flex-wrap: wrap;
        }
        div div {
          flex: 1;
        }
      `,
    ],
  }
);
