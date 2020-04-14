import { writable } from 'svelte/store';
import EventEmitter from 'eventemitter3';

const { subscribe, update, set } = writable(null);

function openModal(component, props = {}) {
  set({
    component,
    props,
  });

  emitter.emit('open', {
    component,
    props,
  });
}

function closeModal() {
  emitter.emit('beforeClose');
  requestAnimationFrame(() => {
    emitter.emit('close');
    set(null);
  });
}

let emitter = new EventEmitter();

let modals = {
  subscribe,
  emitter,
  open: openModal,
  close: closeModal,
};

export { modals, emitter, closeModal, openModal };
