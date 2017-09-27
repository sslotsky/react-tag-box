import PropTypes from 'prop-types'
import TagProp from './utils'
import TagContainer from './TagBoxContainer'

export default class TagBox extends TagContainer {
  static propTypes = {
    tags: PropTypes.arrayOf(TagProp)
  }

  tags() {
    return this.props.tags
  }
}
