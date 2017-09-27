import PropTypes from 'prop-types'

const TagProp = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired
})

export default TagProp
