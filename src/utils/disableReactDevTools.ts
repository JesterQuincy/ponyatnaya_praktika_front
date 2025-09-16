export function disableReactDevTools() {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      const noop = () => {}
      const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__

      if (typeof devTools === 'object') {
        for (const [key, value] of Object.entries(devTools)) {
          devTools[key] = typeof value === 'function' ? noop : null
        }
      }
    }
  }
}
