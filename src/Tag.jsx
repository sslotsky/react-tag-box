import React from 'react'
import PropTypes from 'prop-types'
import TagProp from './utils'

const defaultRender = (tag, remove) => (
  <li className="tag-box-pill" key={tag.value}>
    <span className="tag-box-pill-text">
      {tag.label}
    </span>
    <button type="button" className="remove" onClick={remove}>
      &times;
    </button>
  </li>
)

export default function Tag({ tag, removeTag, render = defaultRender }) {
  return render(tag, () => removeTag(tag))
}

Tag.propTypes = {
  tag: TagProp.isRequired,
  removeTag: PropTypes.func.isRequired
}
