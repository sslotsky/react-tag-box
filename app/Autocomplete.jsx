import React, { PropTypes, Component } from 'react'

export default class extends Component {
  static propTypes = {
    input: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { tags, input, open, close } = nextProps

    if (!input || input === this.props.input) {
      return
    }

    if (tags.some(t => t.includes(input))) {
      open()
    } else {
      close()
    }
  }

  render() {
    const { input, tags, select } = this.props

    if (!input) {
      return false
    }

    const matching = tags.filter(t => t.includes(input)).map(t => (
      <li key={t} onClick={() => select(t)}>{t}</li>
    ))

    return !!matching.length && (
      <ul>
        {matching}
      </ul>
    )
  }
}
