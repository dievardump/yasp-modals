/**
 * Export your components to apps.
 * More:
 * - https://github.com/sveltejs/component-template#consuming-components
 * - https://github.com/rollup/rollup-plugin-svelte#pkgsvelte
 * @see {@link ../package.json}
 */
import Modals from './Modals/index.svelte';

export { modals, emitter, closeModal, openModal } from './boot';
export { Modals };
