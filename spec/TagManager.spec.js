import expect, { createSpy } from 'expect'
import TagManager from '../src/TagManager'

function setup(tagBox = {}) {
  const event = {
    preventDefault: createSpy()
  }

  return { tagManager: new TagManager(event, tagBox), tagBox }
}

describe('TagManager', () => {
  describe('.prev()', () => {
    context('when there are no suggestions', () => {
      const { tagManager, tagBox } = setup({
        state: {
          considering: null
        },
        autocomplete: {
          considerPrevious: createSpy()
        }
      })

      tagManager.prev()

      it('does not try to consider the previous suggestion', () => {
        expect(tagBox.autocomplete.considerPrevious).toNotHaveBeenCalled()
      })
    })

    context('when considering a suggestion', () => {
      const { tagManager, tagBox } = setup({
        state: {
          considering: { label: 'beer', value: 'beer' }
        },
        autocomplete: {
          considerPrevious: createSpy()
        }
      })

      tagManager.prev()

      it('considers the previous suggestion', () => {
        expect(tagBox.autocomplete.considerPrevious).toHaveBeenCalled()
      })
    })
  })

  describe('.next()', () => {
    it('considers the next option', () => {
      const { tagManager, tagBox } = setup({
        autocomplete: {
          considerNext: createSpy()
        }
      })

      tagManager.next()

      expect(tagBox.autocomplete.considerNext).toHaveBeenCalled()
    })
  })

  describe('.create()', () => {
    context('when considering a suggestion', () => {
      const { tagManager, tagBox } = setup({
        state: {
          considering: { label: 'beer', value: 'beer' }
        },
        select: createSpy()
      })

      tagManager.create()

      it('selects the suggestion being considered', () => {
        expect(tagBox.select).toHaveBeenCalledWith(tagBox.state.considering)
      })
    })

    context('when not considering a suggestion', () => {
      context('if the tag is in the suggestion list', () => {
        const tag = { label: 'beer', value: 'beer' }
        const { tagManager, tagBox } = setup({
          state: {
            tag: 'beer'
          },
          props: {
            tags: [tag]
          },
          select: createSpy()
        })

        tagManager.create()

        it('selects from the suggestion list', () => {
          expect(tagBox.select).toHaveBeenCalledWith(tag)
        })
      })

      context('if the tag is not in the suggestion list', () => {
        const tag = { label: 'beer', value: 'beer' }
        const { tagManager, tagBox } = setup({
          state: {
            tag: 'whiskey'
          },
          props: {
            tags: [tag]
          },
          createTag: createSpy()
        })

        tagManager.create()

        it('submits a new tag', () => {
          expect(tagBox.createTag).toHaveBeenCalled()
        })
      })
    })
  })

  describe('.select()', () => {
    context('when there is input', () => {
      context('when considering a suggestion', () => {
        const { tagManager, tagBox } = setup({
          state: {
            tag: 'whis',
            considering: { label: 'whiskey', value: 'whiskey' }
          },
          select: createSpy()
        })

        tagManager.select()

        it('selects the suggestion being considered', () => {
          expect(tagBox.select).toHaveBeenCalledWith(tagBox.state.considering)
        })
      })

      context('when not considering a suggestion', () => {
        const { tagManager, tagBox } = setup({
          state: {
            tag: 'whiskey'
          },
          createTag: createSpy()
        })

        tagManager.select()

        it('submits a new tag', () => {
          expect(tagBox.createTag).toHaveBeenCalled()
        })
      })
    })
  })

  describe('.clear()', () => {
    it('clears the input and the suggestion', () => {
      const { tagManager, tagBox } = setup({
        setState: createSpy()
      })

      tagManager.clear()

      expect(tagBox.setState).toHaveBeenCalledWith({ tag: '', considering: null })
    })
  })

  describe('.deleteLast()', () => {
    context('when there is no input', () => {
      context('when backspace deletion is on', () => {
        const tag = { label: 'beer', value: 'beer' }
        const { tagManager, tagBox } = setup({
          props: {
            backspaceDelete: true,
            selected: [tag],
            removeTag: createSpy()
          }
        })

        tagManager.deleteLast()

        it('removes the last tag', () => {
          expect(tagBox.props.removeTag).toHaveBeenCalledWith(tag)
        })
      })
    })
  })
})
