# Yet Another Svelte Package: Modals

Modals wrapper for Svelte3

## Features

- No top-level Modals context
- open and close modals easily with a function
- No crazy boilerplate

## Installing

> npm install --save-dev yasp-modals

## Very quick example

View live there : https://svelte.dev/repl/1dde32baa79d4d80a9d30937c5cf48f8?version=3.20.1

```html
<!-- App.svelte -->
<script>
  import { Modals, openModal, closeModal } from 'yasp-modals';
  import MySimpleModal from 'MySimpleModal.svelte';

  function onClick() {
    openModal(MySimpleModal, {
      title: 'My Modal',
    });
  }
</script>

<div>
  <a class="back" href="/">&lt; Back to examples</a>
</div>

<main>Main content Blablabl</main>
<button on:click="{onClick}">Open Modal !</button>
<Modals />

<!-- MySimpleModal.svelte -->
<script>
  import { fly } from "svelte/transition";
  export let title = "My Modal Title";

  export let closeModal;
  let props = {};
  let classname = "";
  $: {
    props = $$props;
    if (props.class) {
      classname = props.class;
    }

    delete props.class;
  }
</script>

<style>
  .modal {
    min-width: 400px;
    min-height: 400px;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .modal__header,
  .modal__footer {
    background-color: darkcyan;
    color: white;
    padding: 20px;
  }

  h1 {
    margin: 0;
  }

  .modal__body {
    padding-top: 40px;
    flex: 1 1 0;
  }
</style>

<section
  class={`modal ${classname}`}
  {...props}
  transition:fly={{ y: 100, duration: 400 }}>
  <header class="modal__header">
    <h1>{title}</h1>
  </header>
  <div class="modal__body">My modal content !</div>
  <header class="modal__footer">
    <button on:click={() => closeModal()}>Cancel</button>
  </header>
</section>
```

## Components & methods

This package provides 1 Component and 2 methods, an event emitter and one store to use

Components :

- Modals

Methods:

- openModal
- closeModal

emitter

\$modals

### `<Modals {options?:object}>`

#### Parameters

| Parameter | Optional | Description                               |
| --------- | -------- | ----------------------------------------- |
| `options` | optional | Options for the modal layout and behavior |

- `options`
  - `close`
    - `showBtn`: boolean (default: true) - if a button to close the modal wrapper is added to the layout. Will have `modals__close` for classname
    - `btnText`: string (default: 'close') - the text to show in the close button
    - `onClickOutside`: boolean (default: true) - if the modals wrapper closes when clicking outside a modal content
    - `onEscKey`: boolean (default true) - if the modals wrapper closes when the esc key is pressed
  - `transition`
    - `type`: svelte/transition (default: fade) - the transition type for wrapper appearance
    - `props`: object (default: {}) - the transition properties
  - `props`: object
    - `style`: string (default: see `src/components/Modals.svelte`) - the style to apply to the wrapper
    -  all properties in this object will be passed as attributes using `{...props}` to the wrapper element



### `openModal(component:SvelteComponent, props?:object)`

Opens a Modal

- `component` - the component to add to the Modal wrapper
- `props`: object (default: {}) - props to pass to the component

> When a component is rendered, it will also have openModal and closeModal as properties

### `closeModal()`

Closes the current modal

### emitter

emitter is an EventEmitter.

Events:

- `open` ({component, props}) - emitted when a Modal is opened
- `beforeClose` - emitted before closing a Modal
- `close` - emitted when a modal closes

### modals

Modals is a custom store.
It contains a reference to `openModal`, `closeModal` and the `emitter`.

When the no modal is opened, `$modals` as for value `null`
When a modal is opened, `$modals` as for value `{component, props}`

## Other examples Shipped with this package

The directory `examples` contains examples of different usage of this package.

- the most basic way to open a modal

The best way to test the example(s) is to clone this repository and launch the examples quick server shipped within

```
git clone git@gitlab.com:dievardump/yasp-modals.git
cd yasp-modals/examples
npm install
npm run dev
```

This should create a local server accessible to http://localhost:3333 (if you kept the default port)

## Author

Simon Fremaux / dievardump (dievardump@gmail.com)
