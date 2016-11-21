const ENTER = 13
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const TAB = 9
const ESC = 27
const BKSPC = 8

export default function drive(which, tagManager) {
  const execute = action => () => action.apply(tagManager)

  const eventMap = {
    [ENTER]: execute(tagManager.create),
    [RIGHT]: execute(tagManager.next),
    [DOWN]: execute(tagManager.next),
    [UP]: execute(tagManager.prev),
    [LEFT]: execute(tagManager.prev),
    [TAB]: execute(tagManager.select),
    [ESC]: execute(tagManager.clear),
    [BKSPC]: execute(tagManager.deleteLast)
  }

  return eventMap[which]
}
