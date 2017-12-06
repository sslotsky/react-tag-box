import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect, { createSpy } from 'expect'
import Tag from '../src/Tag'

Enzyme.configure({ adapter: new Adapter() })

describe('<Tag />', () => {
  const props = {
    tag: { value: 'beer', label: 'beer' },
    removeTag: createSpy()
  }

  const wrapper = shallow(
    <Tag {...props} />
  )

  context('when remove button is clicked', () => {
    const button = wrapper.find('button.remove')
    button.simulate('click')

    it('calls removeTag', () => {
      expect(props.removeTag).toHaveBeenCalledWith(props.tag)
    })
  })
})

