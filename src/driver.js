const ENTER = 13
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const TAB = 9
const ESC = 27

export default function drive(event, tagManager) {
  const next = () => {
    event.preventDefault()
    tagManager.next()
  }

  const prev = () => {
    if (tagManager.considering) {
      event.preventDefault()
      tagManager.prev()
    }
  }

  const create = () => {
    event.preventDefault()
    const { tag, tags, create: createTag, select, considering } = tagManager
    if (considering) {
      select(considering)
    } else {
      const existingTag = tags.find(t => t.label === tag)
      if (existingTag) {
        select(existingTag)
      } else {
        createTag()
      }
    }
  }

  const select = () => {
    const { considering, select: selectTag, tag, create: createTag } = tagManager

    if (tag) {
      event.preventDefault()

      if (considering) {
        selectTag(considering)
      } else {
        createTag()
      }
    }
  }

  const clear = () => {
    event.preventDefault()
    tagManager.clear()
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
