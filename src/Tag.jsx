import React, { PropTypes } from 'react'
import TagProp from './utils'

export default function Tag({ tag, removeTag }) {
  const remove = () => removeTag(tag)

  return (
    <li className="tag-box-pill" key={tag.value}>
      <span className="tag-box-pill-text">
        {tag.label}
      </span>
      <button type="button" className="remove" onClick={remove}>
        &times;
      </button>
    </li>
  )
}

Tag.propTypes = {
  tag: TagProp.isRequired,
  removeTag: PropTypes.func.isRequired
}
