import * as utils from '.'

describe('Utils Index', () => {
  describe('Flatten', () => {
    const { flatten } = utils

    test('Able to flatten a simple object with single level nesting', () => {
      const testObj = {
        key1: 'value1',
        key2: { nested1: 'value2' },
      }

      expect(flatten(testObj, '', '.')).toEqual(
        expect.objectContaining({
          key1: 'value1',
          'key2.nested1': 'value2',
        })
      )
    })

    test('Able to flatten object with any level of nesting', () => {
      const testObj = {
        level1: {
          nested1: 'Hello',
          nested2: 'World',
        },
        level2: {
          nested1: 'How',
          nested2: 'are',
          nested3: 'you?',
          nested4: {
            a: {
              b: {
                c: { d: 'e' },
              },
            },
          },
        },
      }
      expect(flatten(testObj, '', '.')).toEqual(
        expect.objectContaining({
          'level1.nested1': 'Hello',
          'level1.nested2': 'World',
          'level2.nested1': 'How',
          'level2.nested2': 'are',
          'level2.nested3': 'you?',
          'level2.nested4.a.b.c.d': 'e',
        })
      )
    })

    test('Doesnot modify the original object', () => {
      const testObj = {
        key1: 'value1',
        key2: { nested1: 'value2' },
      }

      const copyTestObj = JSON.parse(JSON.stringify(testObj))
      flatten(testObj, '', '.')
      expect(testObj).toEqual(expect.objectContaining(copyTestObj))
    })
  })
})
