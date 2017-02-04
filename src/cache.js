export default function cache() {
  let map = {}

  const get = query => map[query]

  const add = (input, tags) => {
    map[input] = tags
    return tags
  }

  const clear = () => {
    map = {}
  }

  return { get, add, clear }
}
