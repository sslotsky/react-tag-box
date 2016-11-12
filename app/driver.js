const ENTER = 13
const DOWN = 40
const UP = 38
const TAB = 9

export default function drive(event, tagManager) {
  const eventMap = {
    [ENTER]: () => {
      event.preventDefault()
      tagManager.create()
    },
    [DOWN]: () => {
      if (tagManager.considering) {
        tagManager.next()
      }
    },
    [UP]: () => {
      if (tagManager.considering) {
        tagManager.prev()
      }
    },
    [TAB]: () => {
      if (tagManager.considering) {
        event.preventDefault()
        tagManager.select(tagManager.considering)
      }
    }
  }

  return eventMap[event.which]
}
