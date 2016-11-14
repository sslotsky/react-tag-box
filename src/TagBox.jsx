import React, { PropTypes, Component } from 'react'
import Autocomplete from './Autocomplete'
import drive from './driver'

const Tag = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired
})

export default class TagBox extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(Tag),
    selected: PropTypes.arrayOf(Tag),
    onSelect: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
    renderNewOption: PropTypes.func
  }

  static defaultProps = {
    renderNewOption: input => `Add ${input}...`
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
      const action = drive(e, {
        tag: this.state.tag,
        tags: this.props.tags,
        create: () => this.createTag(),
        next: () => this.autocomplete.considerNext(),
        prev: () => this.autocomplete.considerPrevious(),
        select: (tag) => this.select(tag),
        clear: () => this.setState({ tag: '', considering: null }),
        considering: this.state.considering
      })

      if (action) {
        action()
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
      <li className="tag-box-pill" key={t.value}>
        <span className="tag-box-pill-text">
          {t.label}
        </span>
        <button type="button" className="remove" onClick={() => removeTag(t)}>&times;</button>
      </li>
    ))

    return (
      <div className="tag-box" onClick={() => this.input.focus()}>
        <ul className="tag-box-pills">
          {pills}
        </ul>
        <input
          ref={node => { this.input = node }}
          value={tag}
          onChange={this.tagUpdater()}
          onKeyDown={this.keyHandler()}
          onBlur={() => this.blurTag()}
        />
        <Autocomplete
          {...this.props}
          ref={node => { this.autocomplete = node }}
          input={tag}
          tags={tags}
          select={(t) => this.select(t)}
          create={() => this.createTag()}
          considering={considering}
          consider={consider}
        />
      </div>
    )
  }
}

