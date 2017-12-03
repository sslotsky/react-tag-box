import PropTypes from 'prop-types'
import makeCache from './cache'
import TagContainer from './TagBoxContainer'

export default class TagBoxAsync extends TagContainer {
  static propTypes = {
    fetch: PropTypes.func.isRequired
  }

  state = {
    tags: [],
    tag: '',
    considering: null,
    loading: false
  }

  cache = makeCache()

  tags() {
    return this.state.tags
  }

  loading() {
    return this.state.loading
  }

  createTag() {
    const { tag } = this.state
    if (tag) {
      this.select({ label: tag })
      this.cache.clear()
    }
  }

  tagUpdater() {
    return e => {
      const input = e.target.value
      this.setState({ tag: input })

      const matches = this.cache.get(input)
      if (matches) {
        return this.setState({ tags: matches })
      }

      this.setState({ loading: true })
      return this.props.fetch(input).then(tags => {
        this.setState({
          tags: this.cache.add(input, tags),
          loading: false
        })
      })
    }
  }
}

