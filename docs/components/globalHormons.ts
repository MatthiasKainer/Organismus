import { defineHormone } from "../../src";

export const submitForm = defineHormone("atoms/form/submit", {
  defaultValue: "",
  readOnce: true,
});



