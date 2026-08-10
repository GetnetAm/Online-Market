import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Calls `callback` when a mousedown happens outside of `target`'s element.
 * Used to close the search dropdown when the user clicks anywhere else.
 * mousedown (not click) is used because it fires before the input's blur —
 * this way a click on a result inside the dropdown isn't accidentally
 * treated as "outside".
 */
export function useClickOutside(target: Ref<HTMLElement | null>, callback: () => void): void {
  function handleMouseDown(event: MouseEvent): void {
    if (target.value && !target.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('mousedown', handleMouseDown))
  onUnmounted(() => document.removeEventListener('mousedown', handleMouseDown))
}
