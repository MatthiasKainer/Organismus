import { pureLit } from "pure-lit";
import { html } from "lit-element";

import "./components";

import { defineHormone, releaseHormone, hypothalamus } from "../src";
import { FormElementHoromoneValue, ListReceptor } from "./components";

const todoList = defineHormone<ListReceptor>("todo/list", {
  defaultValue: { items: [] },
});

const todoAdd = defineHormone<FormElementHoromoneValue>("todo/add");

hypothalamus.on(todoAdd, (todo) =>
  releaseHormone(todoList, (todos) => ({
    items: [...todos.items, todo.value],
    form: todo.form,
  }))
);

export default pureLit("todo-app", () => {
  return html`
    <component-headline level="1">Your todo list</component-headline>
    <div>
      <molecule-input-with-button
        clear
        form="todo-list"
        label="add todo"
        placeholder="insert todo"
        .release=${todoAdd}
      >
        Add todo
      </molecule-input-with-button>
    </div>
    <component-headline level="2">Your todos</component-headline>
    <div>
      <component-list form="todo-list" .receptor=${todoList}></component-list>
    </div>
  `;
});
