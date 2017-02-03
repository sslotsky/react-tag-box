export default function cache() {
  const map = {}

  const get = query => map[query]

  const add = (input, tags) => {
    map[input] = tags
    return tags
  }

  return { get, add }
}
