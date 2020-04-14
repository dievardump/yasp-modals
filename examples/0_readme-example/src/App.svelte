<script>
  import { Modals, openModal, closeModal } from "../../../src/index.js";
  import MySimpleModal from "../../components/MySimpleModal.svelte";

  function onClick() {
    openModal(MySimpleModal, {
      title: "My Modal"
    });
  }
</script>

<div>
  <a class="back" href="/">&lt; Back to examples</a>
</div>

<main>Main content Blablabl</main>
<button on:click={onClick}>Open Modal !</button>
<Modals />
