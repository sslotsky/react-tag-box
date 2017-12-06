import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TagProp from './utils'
import TAG_REJECTED from './constants'
import TagManager from './TagManager'
import drive from './driver'
import Tag from './Tag'
import Autocomplete from './Autocomplete'

export default class TagBoxContainer extends Component {
  static propTypes = {
    selected: PropTypes.arrayOf(TagProp),
    onSelect: PropTypes.func.isRequired,
    renderNewOption: PropTypes.func,
    removeTag: PropTypes.func.isRequired,
    renderTag: PropTypes.func,
    loadingText: PropTypes.string,
    selectedText: PropTypes.string,
    placeholder: PropTypes.string,
    search: PropTypes.func,
    exactMatch: PropTypes.func
  }

  static defaultProps = {
    renderNewOption: input => `Add ${input}...`,
    loadingText: 'Loading...',
    selectedText: 'Already Selected',
    placeHolder: '',
    search: (tag, input) => tag.label.includes(input),
    exactMatch: (tag, input) => tag.label === input
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
    const { selected } = this.props
    if (!tag || selected.map(t => t.label).includes(tag.label)) {
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
      const tagManager = new TagManager(e, this)
      const action = drive(e.which, tagManager)

      if (action) {
        action()
      }
    }
  }

  tags() {
    throw new Error('Component must implement the tags() method')
  }

  loading() {
    return false
  }

  render() {
    const consider = (option) => {
      this.setState({ considering: option })
    }

    const { tag, considering } = this.state
    const { selected, removeTag, placeholder, renderTag, search, exactMatch } = this.props
    const pills = selected.map(t => (
      <Tag tag={t} key={t.value} removeTag={removeTag} render={renderTag} />
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
          loading={this.loading()}
          tags={this.tags()}
          select={(t) => this.select(t)}
          create={() => this.createTag()}
          search={(t, input) => search(t, input)}
          exactMatch={(t, input) => exactMatch(t, input)}
          considering={considering}
          consider={consider}
        />
      </div>
    )
  }
}
