import 'server-only'
import { cache } from 'react'

/**
 * Creates a server context with a default value.
 * @template T
 * @param defaultValue The default value for the server context.
 * @returns {[() => T, (value: T) => void]} A tuple of functions: [getValue, setValue].
 */
export default function createServerContext(defaultValue) {
  const getRef = cache(() => ({ current: defaultValue }))

  /**
   * @returns {T}
   */
  const getValue = () => getRef().current

  /**
   * @argument {T} value
   * @returns {void}
   */
  const setValue = (value) => {
    getRef().current = value
  }

  return [getValue, setValue]
}