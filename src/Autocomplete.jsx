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
    select: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    considering: Tag,
    consider: PropTypes.func.isRequired,
    renderNewOption: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { tags, input, consider } = nextProps

    if (this.props.input && !input) {
      consider(null)
    }

    if (!input || input === this.props.input) {
      return
    }

    const matches = tags.filter(t => t.label.includes(input))
    if (matches.length) {
      consider(matches[0])
    } else {
      consider(null)
    }
  }

  matchingOptions() {
    const { tags, input } = this.props
    const matches = tags.filter(t => t.label.includes(input))
    const values = matches.map(t => t.value)

    return { matches, values }
  }

  considerNext() {
    const { consider, considering } = this.props
    const { matches, values } = this.matchingOptions()

    if (!matches.length) {
      return
    }

    const nextIndex = Math.min(matches.length - 1, values.indexOf(considering.value) + 1)
    consider(matches[nextIndex])
  }

  considerPrevious() {
    const { consider, considering } = this.props
    const { matches, values } = this.matchingOptions()

    if (!matches.length) {
      return
    }

    const nextIndex = Math.max(0, values.indexOf(considering.value) - 1)
    consider(matches[nextIndex])
  }

  render() {
    const { input, select, create, considering, consider, renderNewOption } = this.props

    if (!input) {
      return false
    }

    const { matches } = this.matchingOptions()
    const exactMatch = matches.find(t => t.label === input)
    const addNewOption = !exactMatch && (
      <li
        className={classNames('add-new', { considering: !considering })}
        onClick={create}
        onMouseOver={() => consider(null)}
      >
        <span className="option-text">
          {renderNewOption(input)}
        </span>
      </li>
    )

    const matching = matches.map(t => {
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
          <span className="option-text">
            {t.label}
          </span>
        </li>
      )
    })

    return (
      <ul className="autocomplete">
        {addNewOption}
        {matching}
      </ul>
    )
  }
}
