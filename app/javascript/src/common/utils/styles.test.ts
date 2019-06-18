import * as styleUtils from './styles'

describe('Style Utils', () => {
  describe('convertToCSSVariablesFormat', () => {
    const { convertToCSSVariablesFormat } = styleUtils
    test('Able to get color variables in correct format', () => {
      expect(
        convertToCSSVariablesFormat({
          darkGreen: 'green',
          'pallete.primary.textContrast': '#0f0',
        })
      ).toEqual(
        expect.objectContaining({
          '--dark-green': 'green',
          '--pallete-primary-text-contrast': '#0f0',
        })
      )
    })
  })
})
