import React, { PropTypes, Component } from 'react'
import Autocomplete from './Autocomplete'

const Tag = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired
})

export default class TagBox extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(Tag),
    selected: PropTypes.arrayOf(Tag),
    onSelect: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired
  }

  state = {
    tag: '',
    considering: null,
    open: false
  }

  tagUpdater() {
    return e => {
      this.setState({ tag: e.target.value })
    }
  }

  select(tag) {
    if (!tag) {
      return
    }

    this.props.onSelect(tag)
    this.setState({ tag: '' })
  }

  createTag() {
    const { tag } = this.state
    if (tag) {
      this.select({ label: tag })
    }
  }

  keyHandler() {
    return e => {
      const { open, considering } = this.state

      switch (e.which) {
        case 13:
          e.preventDefault()
          this.createTag()
          break
        case 40:
          if (open) {
            this.autocomplete.considerNext()
          }
          break
        case 38:
          if (open) {
            this.autocomplete.considerPrevious()
          }
          break
        case 9:
          if (open) {
            e.preventDefault()
            this.select(considering)
          }
          break
        default: break
      }
    }
  }

  render() {
    const autocompleteOpen = () => {
      this.setState({ open: true })
    }

    const autocompleteClose = () => {
      this.setState({ open: false })
    }

    const consider = (option) => {
      this.setState({ considering: option })
    }

    const { tag, considering } = this.state
    const { tags, selected, removeTag } = this.props
    const pills = selected.map(t => (
      <li key={t.value}>
        {t.label}
        <button onClick={() => removeTag(t)}>x</button>
      </li>
    ))

    return (
      <div>
        <ul>
          {pills}
        </ul>
        <input
          value={tag}
          onChange={this.tagUpdater()}
          onKeyDown={this.keyHandler()}
          onBlur={() => this.createTag()}
        />
        <Autocomplete
          ref={node => { this.autocomplete = node }}
          input={tag}
          tags={tags}
          open={autocompleteOpen}
          close={autocompleteClose}
          select={() => this.select()}
          considering={considering}
          consider={consider}
        />
      </div>
    )
  }
}

