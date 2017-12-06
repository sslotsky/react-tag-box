import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect, { createSpy } from 'expect'

import Autocomplete from '../src/Autocomplete'

Enzyme.configure({ adapter: new Adapter() })

describe('<Autocomplete />', () => {
  describe('.render()', () => {
    const [beer, beerNuts] = [{
      label: 'beer',
      value: 'beer'
    }, {
      label: 'beer nuts',
      value: 'beer nuts'
    }]

    const props = {
      input: 'be',
      consider: createSpy(),
      considering: beer,
      tags: [beer, beerNuts],
      renderNewOption: createSpy(),
      search: () => [beer, beerNuts],
      exactMatch: (input, tag) => tag.label === input
    }

    const exactMatchSpy = expect.spyOn(props, 'exactMatch').andCallThrough()

    beforeEach(() => {
      exactMatchSpy.restore()
    })

    shallow(
      <Autocomplete {...props} />
    )

    it('determines if the input exactly matches a tag', () => {
      expect(exactMatchSpy.called)
    })
  })

  describe('.considerNext()', () => {
    context('when considering a suggestion', () => {
      const [beer, beerNuts] = [{
        label: 'beer',
        value: 'beer'
      }, {
        label: 'beer nuts',
        value: 'beer nuts'
      }]

      const props = {
        input: 'be',
        consider: createSpy(),
        considering: beer,
        tags: [beer, beerNuts],
        renderNewOption: createSpy(),
        search: () => [beer, beerNuts],
        exactMatch: createSpy()
      }

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().considerNext()

      it('considers the next suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(beerNuts)
      })
    })

    context('when not considering anything', () => {
      const tag = { label: 'beer', value: 'beer' }
      const props = {
        input: 'be',
        consider: createSpy(),
        tags: [tag],
        renderNewOption: createSpy(),
        search: () => [tag],
        exactMatch: createSpy()
      }

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().considerNext()

      it('considers the first suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(tag)
      })
    })
  })

  describe('.considerPrevious()', () => {
    context('when considering the first suggestion', () => {
      const tag = { label: 'beer', value: 'beer' }
      const props = {
        input: 'be',
        consider: createSpy(),
        considering: tag,
        tags: [tag],
        renderNewOption: createSpy(),
        search: () => [tag],
        exactMatch: createSpy()
      }

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().considerPrevious()

      it('clears the suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(null)
      })
    })

    context('when considering any other suggestion', () => {
      const [beer, beerNuts] = [{
        label: 'beer',
        value: 'beer'
      }, {
        label: 'beer nuts',
        value: 'beer nuts'
      }]

      const props = {
        input: 'be',
        consider: createSpy(),
        considering: beerNuts,
        tags: [beer, beerNuts],
        renderNewOption: createSpy(),
        search: () => [beer, beerNuts],
        exactMatch: createSpy()
      }

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().considerPrevious()

      it('considers the previous suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(beer)
      })
    })
  })

  describe('.componentWillReceiveProps', () => {
    context('when the input is cleared', () => {
      const props = {
        input: 'b',
        consider: createSpy(),
        renderNewOption: createSpy(),
        tags: [],
        search: createSpy(),
        exactMatch: createSpy()
      }

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().componentWillReceiveProps({ ...props, input: '' })

      it('clears the active suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(null)
      })
    })

    context('when there are suggestions', () => {
      const tag = { label: 'beer', value: 'beer' }
      const props = {
        consider: createSpy(),
        renderNewOption: createSpy(),
        selected: [],
        tags: [tag],
        search: () => [tag],
        exactMatch: createSpy()
      }
      const searchSpy = expect.spyOn(props, 'search').andCallThrough()

      beforeEach(() => {
        searchSpy.restore()
      })

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().componentWillReceiveProps({ ...props, input: 'be' })

      it('considers the first suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(tag)
      })

      it('searches for suggestions', () => {
        expect(searchSpy).toHaveBeenCalledWith(tag, 'be')
      })
    })

    context('when there are no suggestions', () => {
      const tag = { label: 'beer', value: 'beer' }
      const props = {
        consider: createSpy(),
        renderNewOption: createSpy(),
        tags: [tag],
        search: createSpy(),
        exactMatch: createSpy()
      }

      const wrapper = shallow(
        <Autocomplete {...props} />
      )

      wrapper.instance().componentWillReceiveProps({ ...props, input: 'whi' })

      it('clears the active suggestion', () => {
        expect(props.consider).toHaveBeenCalledWith(null)
      })
    })
  })
})
