import React, { PropTypes, Component } from 'react'
import Autocomplete from './Autocomplete'
import drive from './driver'
import TAG_REJECTED from './constants'
import TagProp from './utils'
import Tag from './Tag'

export default class TagBox extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(TagProp),
    selected: PropTypes.arrayOf(TagProp),
    onSelect: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
    renderNewOption: PropTypes.func,
    placeholder: PropTypes.string,
    backspaceDelete: PropTypes.bool
  }

  static defaultProps = {
    renderNewOption: input => `Add ${input}...`,
    placeHolder: ''
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

    const status = this.props.onSelect(tag)
    if (status !== TAG_REJECTED) {
      this.setState({ tag: '' })
    }
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
      const { tags, selected, removeTag, backspaceDelete } = this.props
      const action = drive(e, {
        tag: this.state.tag,
        tags,
        selected,
        backspaceDelete,
        remove: removeTag,
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
    const { tags, selected, removeTag, placeholder } = this.props
    const pills = selected.map(t => (
      <Tag tag={t} key={t.value} removeTag={removeTag} />
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
          placeholder={placeholder}
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

