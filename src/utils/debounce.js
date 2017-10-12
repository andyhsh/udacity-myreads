export const debounce = (fn, wait) => {
  // set up timeout variable to be accessible through closure on the returned anonymous function
  let timeout
  return function() {
    // arrow function provides lexical scoping of "this" and "arguments"
    const callFunction = () => {
      timeout = null
      fn.apply(this, arguments)
    }
    // clear the same timeout variable through closure
    clearTimeout(timeout)
    timeout = setTimeout(callFunction, wait)
  }
}