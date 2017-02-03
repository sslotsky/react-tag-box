import makeCache from './cache'
import TagContainer from './TagBoxContainer'

export default class TagBoxAsync extends TagContainer {
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

  tagUpdater() {
    return e => {
      const input = e.target.value
      const matches = this.cache.get(input)
      if (matches) {
        return this.setState({ tag: input, tags: matches })
      }

      this.setState({ loading: true })
      return this.props.fetch(input).then(tags => {
        this.setState({
          tag: input,
          tags: this.cache.add(input, tags),
          loading: false
        })
      })
    }
  }
}

