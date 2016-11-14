const ENTER = 13
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const TAB = 9
const ESC = 27

export default function drive(event, tagManager) {
  const next = () => {
    if (tagManager.considering) {
      event.preventDefault()
      tagManager.next()
    }
  }

  const prev = () => {
    if (tagManager.considering) {
      event.preventDefault()
      tagManager.prev()
    }
  }

  const create = () => {
    event.preventDefault()
    const { tag, tags, create: createTag, select } = tagManager
    const existingTag = tags.find(t => t.label === tag)
    if (existingTag) {
      select(existingTag)
    } else {
      createTag()
    }
  }

  const select = () => {
    if (tagManager.considering) {
      event.preventDefault()
      tagManager.select(tagManager.considering)
    }
  }

  const clear = () => {
    if (tagManager.considering) {
      tagManager.clear()
    }
  }

  const eventMap = {
    [ENTER]: create,
    [RIGHT]: next,
    [DOWN]: next,
    [UP]: prev,
    [LEFT]: prev,
    [TAB]: select,
    [ESC]: clear
  }

  return eventMap[event.which]
}
