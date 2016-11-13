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

  const eventMap = {
    [ENTER]: () => {
      event.preventDefault()
      tagManager.create()
    },
    [RIGHT]: next,
    [DOWN]: next,
    [UP]: prev,
    [LEFT]: prev,
    [TAB]: () => {
      if (tagManager.considering) {
        event.preventDefault()
        tagManager.select(tagManager.considering)
      }
    },
    [ESC]: () => {
      if (tagManager.considering) {
        tagManager.clear()
      }
    }
  }

  return eventMap[event.which]
}
