import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

const Tag = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired
})

export default class extends Component {
  static propTypes = {
    input: PropTypes.string,
    tags: PropTypes.arrayOf(Tag).isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    considering: Tag,
    consider: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { tags, input, open, close, consider } = nextProps

    if (this.props.input && !input) {
      consider(null)
    }

    if (!input || input === this.props.input) {
      return
    }

    const matches = tags.filter(t => t.label.includes(input))
    if (matches.length) {
      open()
      consider(matches[0])
    } else {
      close()
    }
  }

  considerNext() {
    const { tags, consider, considering, input } = this.props
    const matches = tags.filter(t => t.label.includes(input))
    const values = matches.map(t => t.value)
    const nextIndex = Math.min(matches.length - 1, values.indexOf(considering.value) + 1)
    consider(matches[nextIndex])
  }

  considerPrevious() {
    const { tags, consider, considering, input } = this.props
    const matches = tags.filter(t => t.label.includes(input))
    const values = matches.map(t => t.value)
    const nextIndex = Math.max(0, values.indexOf(considering.value) - 1)
    consider(matches[nextIndex])
  }

  render() {
    const { input, tags, select, considering, consider } = this.props

    if (!input) {
      return false
    }

    const matching = tags.filter(t => t.label.includes(input)).map(t => {
      const className = classNames({
        considering: considering === t
      })

      return (
        <li
          key={t.value}
          className={className}
          onClick={() => select(t)}
          onMouseOver={() => consider(t)}
        >
          {t.label}
        </li>
      )
    })

    return !!matching.length && (
      <ul className="autocomplete">
        {matching}
      </ul>
    )
  }
}
