<script>
  import Modals from './Modals/index.svelte';
  import TestModal from './tests/components/TestModal.svelte';

  import { openModal } from './boot';

  function onOpenModal() {
    openModal(TestModal, {
      title: 'Another title: Test',
    });
  }
</script>

<button on:click={onOpenModal}>Open Modal</button>
<Modals />

<style>
  :global(.modals) {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
