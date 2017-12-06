import { List } from 'immutable'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect, { createSpy } from 'expect'
import TagBox from '../src/TagBox'
import Tag from '../src/Tag'

Enzyme.configure({ adapter: new Adapter() })

const sampleTags = List(
  ['foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'].map(t => ({
    label: t,
    value: t
  }))
)

describe('<TagBox />', () => {
  it('renders a <Tag /> for each selected tag', () => {
    const props = {
      tags: sampleTags.toJS(),
      selected: sampleTags.take(3).toJS(),
      onSelect: createSpy(),
      removeTag: createSpy()
    }

    const wrapper = shallow(
      <TagBox {...props} />
    )

    expect(wrapper.find(Tag).length).toEqual(props.selected.length)
  })
})
