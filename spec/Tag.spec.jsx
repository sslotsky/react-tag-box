import React from 'react'
import { shallow } from 'enzyme'
import expect, { createSpy } from 'expect'
import Tag from '../src/Tag'

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

