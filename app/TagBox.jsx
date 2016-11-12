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
    considering: null
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

  blurTag() {
    const { tag, considering } = this.state

    if (considering) {
      this.select(considering)
    } else if (tag) {
      this.select({ label: tag })
    }
  }

  createTag() {
    const { tag } = this.state
    if (tag) {
      this.select({ label: tag })
    }
  }

  keyHandler() {
    return e => {
      const { considering } = this.state

      switch (e.which) {
        case 13:
          e.preventDefault()
          this.createTag()
          break
        case 40:
          if (considering) {
            this.autocomplete.considerNext()
          }
          break
        case 38:
          if (considering) {
            this.autocomplete.considerPrevious()
          }
          break
        case 9:
          if (considering) {
            e.preventDefault()
            this.select(considering)
          }
          break
        default: break
      }
    }
  }

  render() {
    const consider = (option) => {
      this.setState({ considering: option })
    }

    const { tag, considering } = this.state
    const { tags, selected, removeTag } = this.props
    const pills = selected.map(t => (
      <li key={t.value}>
        {t.label}
        <button className="remove" onClick={() => removeTag(t)}>x</button>
      </li>
    ))

    return (
      <div className="tag-box">
        <ul className="pills">
          {pills}
        </ul>
        <input
          value={tag}
          onChange={this.tagUpdater()}
          onKeyDown={this.keyHandler()}
          onBlur={() => this.blurTag()}
        />
        <Autocomplete
          ref={node => { this.autocomplete = node }}
          input={tag}
          tags={tags}
          select={() => this.select()}
          considering={considering}
          consider={consider}
        />
      </div>
    )
  }
}

