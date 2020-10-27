# Organismus

> Organismus, german for Organism. A system regarded as analogous in its structure or functions to a living body.

A library to share messages in your frontend application organism without additional wiring. See the tabs for some examples

## Note

This library is an experimental approach to state management, and is mostly me "thinking out loud". If you want to use it (or something like it) feel free, just be aware that I feel it's partly too implicit, needs to much thinking to do it right, and I can think of a dozen ways it would screw you over.

That being said, have fun.

## Purpose

The most difficult part of every application is state management. There are sufficient solutions for local state (the element itself), for the application it's more difficult.

Properties/Events can help you there, but might lead to prop-drilling (passing properties down until they are needed), or via context in libraries like react which is tightly coupled to the UI itself.

This library uses an approach that focused on the global (organism) level, allowing you to send messages between cells (elements) of your page.

## Wording/Domain

This library uses the wording that is coming from Biology, and at such aims to replicate patterns learned there with some abstraction on top of it.

| Name             | Description                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Organism**     | The application, or group of applications (microfrontends) that act as one                                              |
| **Hormone**      | A specific message, send by special hormone producing entities that can `released` and carry some `state`               |
| **Receptor**     | An interface on a LitElement that can receive one type of hormone and gets triggered every time the hormone is released |
| **Hypothalamus** | Allows to orchestrate hormones and trigger side-effects on a global (organism wide) level                               |

The idea that Organismus follows is different from other libraries because it means that hormones must not be triggered by components only, but basically by everything, and therefore allows you to, as an example, connect a web-socket service class with your components.

In difference to libraries like redux it means that you don't have one global state, but a state for each hormone that is orchestrated by events.

## Usage

### Hormones and receptors

The hormone is the base unit, and has to be defined first anywhere.

The defined hormone can then be used to be `released`, or to define a receptor.

```ts
const hormone = defineHormone<boolean>("example");

// with react
export const SomeElement = () => {
  const [getState, setState] = useState(false)
  useReceptor(element, hormone, async value => setState(value));
  return <p>React State: ${getState()}</p>;
}

// with pure-lit
pureLit("some-element", (element) => {
  const {getState, publish} = useState(element, false)
  // define receptor
  useReceptor(element, hormone, async value => publish(value));
  return html`<p>pure-lit State: ${getState()}</p>`;
});

// <SomeElement>: <p>React State: false</p>
// <some-element>: <p>pure-lit State: false</p>

// release hormone
releaseHormone(hormone, true);

// <SomeElement>: <p>React State: true</p>
// <some-element>: <p>pure-lit State: true</p>
```

Unlike the hormone you can find in nature, this one however can transport additional information if you need it. Let's take the example, but this time with a counter

```ts
const hormone = defineHormone("example", { count: 0 });

pureLit("some-element", (element) => {
  const count = useState(element, 0)
  useReceptor(element, hormone, async value => count.publish(value.count));
  return html`<p>Receptor State: ${count.getState()}</p>`;
});

// some-element: <p>Receptor State: 0</p>

// release hormone
releaseHormone(hormone, (currentCount) => ({
  count: currentCount + 1,
}));

// some-element: <p>Receptor State: 1</p>
```

In theory, you can also release the hormone from the same component, but really you can release it everywhere as they are global in the organism.

Receptors can also have filters. This can be used to manage the global state drawbacks. Let's take the counter example, and a page where two counters are used.

```ts
const hormone = defineHormone("example", { count: 0, counter: undefined });

pureLit("some-element", (element) => {
  const count = useState(element, 0)
  useReceptor(
    element,
    hormone,
    // the filter that only applies the counter if the name===counter
    ({ counter }) => counter === element.name,
    async ({ count }) => count.publish(count)
  );
  return html`<p>Receptor State: ${count.getState()}</p>`;
});

// some-element[name=first]: <p>Receptor State: 0</p>
// some-element[name=other]: <p>Receptor State: 0</p>

// release hormone
releaseHormone(hormone, (currentCount) => ({
  count: currentCount + 1,
  counter: "first",
}));

// some-element[name=first]: <p>Receptor State: 1</p>
// some-element[name=other]: <p>Receptor State: 0</p>
```

If we wouldn't have added the filter, all counter instances would have been incremented. 

While this might look like a drawback at first (and it is something that can lead to bugs if not tested properly), it is actually one of the huge advantages of `Organismus`. Think about a spreadsheet like application. We have thousands of identical cells, some of those with references to others. If a field changes, it releases a hormone, and the others can check if they are affected and change only if.

```ts
const cellChanged = defineHormone("cell/changed", {
  row: 0,
  column: "A",
  value: "",
});

pureLit("cell-element", (element) => {
  const { row, col } = element;
  const value = useState(element, "")
  const referenceFieldValues = useState(element, {})
  isFormula(value) && referenceFieldValues.publish(loadReferenceFields(value))
  useReceptor(
    element,
    cellChanged,
    // the filter that only applies if the field has a formula and references the field that changed
    (cell) => isFormula(value) && hasReference(value, cell)
    async cell => referenceFieldValues.publish(
      ...referenceFieldValues.getState().filter(field => field !== cell),
      cell
    )
  );
  return isFormula(value)
    ? html`${calculatedField(referenceFieldValues)}`
    : html`<input
        type="text"
        @change=${({ target }) =>
          releaseHormone(cellChanged, {
            value: target.value,
            row,
            col,
          })}
        value=${value}
      />`;
});
```

### Hypothalamus

As your application grows, you will get to the point where you need some orchestration. For that you can use the `hypothalamus`, which allows you to trigger side-effects on released hormones.

Let's take a look at an example todo-list

```ts
const todoAdd = defineHormone<string>("todo/add");
const todoList = defineHormone<string[]>("todo/list", { defaultValue: [] });

hypothalamus.on(todoAdd, (todo) =>
  releaseHormone(todoList, (todos) => [...todos, todo])
);

pureLit("component-list", (element) => {
  const list = useReceptor(element, element.receptor);
  return html`<ul>
    ${list.map((item) => html`<li>${item}</li>`)}
  </ul>`;
});

export default pureLit("todo-app", () => {
  return html`
    <input-with-button @onSubmit=${(value) => releaseHormone(todoAdd, value)}>
      Add todo
    </input-with-button>
    <h2>Your todos</h2>
    <div><component-list .receptor=${todoList}></component-list></div>
  `;
});
```

The two hormones are separating the information of the change, and the state of the list. When we release the todoAdd Hormone, the hypothalamus releases the todoList, which will be received by the `component-list` that uses the receptor.

The hypothalamus allows you to collect multiple hormones, and trigger only after all were released.

```ts
const corticoliberin = defineHormone("Corticoliberin", { defaultValue: false });
const adrenocorticotropin = defineHormone("Adrenocorticotropin", {
  defaultValue: false,
});

const receiver = jest.fn();

hypothalamus.on([corticoliberin, adrenocorticotropin], (result) => {
  receiver(result);
});

it("does not trigger when only no hormone is released", () => {
  expect(receiver).not.toBeCalled();
});

it("does not trigger when only one hormone is released", () => {
  releaseHormone(corticoliberin);
  expect(receiver).not.toBeCalled();
});

it("triggers the connection when all hormones are released", () => {
  releaseHormone(adrenocorticotropin);
  releaseHormone(corticoliberin);
  expect(receiver).toBeCalled();
});

it("doesn't trigger the connection again after all hormones are released but only after all hormones are released a second time", () => {
  releaseHormone(adrenocorticotropin, true);
  releaseHormone(corticoliberin, true);
  expect(receiver).toBeCalledTimes(1);
  // check the result directly
  expect(receiver).toBeCalledWith({
    Adrenocorticotropin: true,
    Corticoliberin: true,
  });
  // or use the getValue helper function that allows passing the hormone
  const result = receiver.mock.calls[0][0];
  expect(getValue(adrenocorticotropin, result)).toBe(true);
  expect(getValue(corticoliberin, result)).toBe(false);

  releaseHormone(corticoliberin);
  expect(receiver).toBeCalledTimes(1);
  releaseHormone(adrenocorticotropin);
  expect(receiver).toBeCalledTimes(2);
});
```

### Single Hormone

`SingleHormone` are a special types of hormone that reset their state to the initial value after all receivers have received the new value. An example can be a form that changes it's value to true once submitted, and back to false immediately after, or the spreadsheet example where every hormone is a `SingleHormone`.

You should use this when releasing the same hormone from a lot of places (like in the spreadsheets).
