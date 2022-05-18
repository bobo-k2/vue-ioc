import { InjectionKey, inject } from 'vue'
import { TokenApi } from './token-api'

const TokenApiKey: InjectionKey<TokenApi> = Symbol('TokenApi')

function injectStrict<T> (key: InjectionKey<T>, fallback?: T): T {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}

export { TokenApiKey, injectStrict }
