export default class TagManager {
  constructor(e, tagBox) {
    this.event = e
    this.tagBox = tagBox
    this.tagBoxData = { ...tagBox.props, ...tagBox.state }
  }

  execute(action) {
    this.event.preventDefault()
    action()
  }

  prev() {
    if (this.tagBoxData.considering) {
      this.execute(() => this.tagBox.autocomplete.considerPrevious())
    }
  }

  next() {
    this.execute(() => this.tagBox.autocomplete.considerNext())
  }

  create() {
    const { considering, tags, tag } = this.tagBoxData

    this.execute(() => {
      if (considering) {
        this.tagBox.select(considering)
      } else {
        const existingTag = tags.find(t => t.label === tag)
        if (existingTag) {
          this.tagBox.select(existingTag)
        } else {
          this.tagBox.createTag()
        }
      }
    })
  }

  select() {
    const { considering, tag } = this.tagBoxData

    this.execute(() => {
      if (tag) {
        if (considering) {
          this.tagBox.select(considering)
        } else {
          this.tagBox.createTag()
        }
      }
    })
  }

  clear() {
    this.execute(() => this.tagBox.setState({ tag: '', considering: null }))
  }

  deleteLast() {
    const { selected, tag, backspaceDelete, removeTag } = this.tagBoxData

    if (tag || !backspaceDelete) {
      return
    }

    this.execute(() => {
      removeTag(selected[selected.length - 1])
    })
  }
}
