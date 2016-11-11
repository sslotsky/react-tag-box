import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

export default class extends Component {
  static propTypes = {
    input: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired
  }

  considerNext() {
    const { tags, consider, considering, input } = this.props
    const matches = tags.filter(t => t.includes(input))
    const nextIndex = Math.min(matches.length - 1, matches.indexOf(considering) + 1)
    consider(matches[nextIndex])
  }

  considerPrevious() {
    const { tags, consider, considering, input } = this.props
    const matches = tags.filter(t => t.includes(input))
    const nextIndex = Math.max(0, matches.indexOf(considering) - 1)
    consider(matches[nextIndex])
  }

  componentWillReceiveProps(nextProps) {
    const { tags, input, open, close, considering, consider } = nextProps

    if (!input || input === this.props.input) {
      return
    }

    const matches = tags.filter(t => t.includes(input))
    if (matches.length) {
      open()
      consider(matches[0])
    } else {
      close()
    }
  }

  render() {
    const { input, tags, select, considering, consider } = this.props

    if (!input) {
      return false
    }

    const matching = tags.filter(t => t.includes(input)).map(t => {
      const className = classNames({
        considering: considering === t
      })

      return (
        <li
          key={t}
          className={className}
          onClick={() => select(t)}
          onMouseOver={() => consider(t)}
        >
          {t}
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
