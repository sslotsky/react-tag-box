import { List } from 'immutable'
import React, { Component } from 'react'
import { TagBox } from '../src'
import classNames from 'classnames'
import './styles.scss'

const systemTags = List(
  ['node', 'javascript', 'es6'].map(t => ({
    label: t,
    value: t,
    system: true
  }))
)

const userTags = List(
  ['foo', 'bar', 'baz'].map(t => ({
    label: t,
    value: t
  }))
)

const sampleTags = systemTags.concat(userTags)

export default class CustomRendering extends Component {
  state = {
    tags: sampleTags,
    selected: sampleTags.take(4)
  }

  render() {
    const { tags, selected } = this.state
    const onSelect = tag => {
      const newTag = {
        label: tag.label,
        value: tag.value || tag.label
      }

      this.setState({
        selected: selected.push(newTag)
      })
    }

    const remove = tag => {
      this.setState({
        selected: selected.filter(t => t.value !== tag.value)
      })
    }

    const renderTag = (tag, remove) => {
      const css = classNames('tag-box-pill', { system: tag.system })

      const btn = tag.system ? (
        <button type="button" className="remove">
          &oslash;
        </button>
      ) : (
        <button type="button" className="remove" onClick={remove}>
          &times;
        </button>
      )

      return (
        <li className={css} key={tag.value}>
          <span className="tag-box-pill-text">
            {tag.label}
          </span>
          {btn}
        </li>
      )
    }

    return (
      <TagBox
        tags={tags.toJS()}
        selected={selected.toJS()}
        onSelect={onSelect}
        removeTag={remove}
        renderTag={renderTag}
        placeholder="You can customize how the tags should render"
      />
    )
  }
}


