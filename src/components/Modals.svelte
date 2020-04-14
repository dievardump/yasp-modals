<script>
  import { fade } from "svelte/transition";
  import { modals, openModal, closeModal } from "../boot";

  export let options = {};

  const defaultClose = {
    showBtn: true,
    btnText: "close",
    onClickOutside: true,
    onEscKey: true
  };

  const defaultTransition = {
    type: fade,
    props: {}
  };

  const defaultProps = {
    style: `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
			background-color: rgba(0, 0, 0, .5);
		`
  };

  let close = {};
  let transitionType = fade;
  let transitionProps = {};
  let props = {};

  function mergeOptions(options) {
    close = {
      ...defaultClose,
      ...(options.close || {})
    };

    let transition = {
      ...defaultTransition,
      ...(options.transition || {})
    };

    transitionType = transition.type;
    transitionProps = transition.props;

    props = {
      ...defaultProps,
      ...(options.props || {})
    };
  }

  let is_open = false;
  function modalChanged($modal) {
    if ($modal) {
    }

    is_open = !!modal;
  }

  $: mergeOptions(options);
  $: modalChanged($modals);

  function onClickOutside(e) {
    if (close.onClickOutside && this === e.originalTarget) {
      closeModal();
    }
  }

  const onKeyUp = e => {
    if (is_open) {
      if (e.key === "Escape" && defaultClose.onEscKey) {
        onClose(e);
      }
    }
  };

  function onClose(e) {
    e.preventDefault();
    closeModal();
  }
</script>

<style>
  .modals__close {
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background-color: transparent;
    color: white;
  }
</style>

<svelte:window on:keyup={onKeyUp} />
{#if is_open}
  <section
    class="modals"
    on:click={onClickOutside}
    transition:transitionType={transitionProps}
    {...defaultProps}>
    {#if close.showBtn}
      <button class="modals__close" on:click={onClose}>{close.btnText}</button>
    {/if}

    <svelte:component
      this={$modals.component}
      {openModal}
      {closeModal}
      {...$modals.props} />
  </section>
{/if}
