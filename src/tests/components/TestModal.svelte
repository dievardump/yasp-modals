<script>
  import { fly } from 'svelte/transition';
  export let title = 'My Modal Title';

  export let closeModal;
  let props = {};
  let classname = '';
  $: {
    props = $$props;
    if (props.class) {
      classname = props.class;
    }

    delete props.class;
  }
</script>

<section
  class={`modal ${classname}`}
  {...props}
  transition:fly={{ y: 100, duration: 400 }}
>
  <header class="modal__header">
    <h1>{title}</h1>
  </header>
  <div class="modal__body">My modal content !</div>
  <header class="modal__footer">
    <button on:click={() => closeModal()}>Cancel</button>
  </header>
</section>

<style>
  .modal {
    min-width: 400px;
    min-height: 400px;
    background-color: white;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
