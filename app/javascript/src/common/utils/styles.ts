import { ObjectWithStringValues } from '../types'

/**
 * Function to get all css properties in css variables format
 * 2. Uses Capital letters as point in which it is to be split by "-"
 * 1. Converts all keys to lowerCase Format
 *
 * @param properties - CSS properties in key: value format
 * @param splitBy - Separator to split the strin by and apply "-" between them
 *
 * @example
 * convertToCSSVariablesFormat({'darkBlue': '#196ae5'})
 * // returns {--dark-blue: '#196ae5' }
 *
 */
export const convertToCSSVariablesFormat = (
  properties: ObjectWithStringValues,
  splitBy: string = '\\.'
): ObjectWithStringValues =>
  Object.entries(properties).reduce(
    (obj, [key, value]) => ({
      ...obj,
      [`--${key
        .replace(new RegExp(splitBy, 'g'), '-')
        .replace(/([a-z]+)([A-Z][a-z]+)/, '$1-$2')
        .toLocaleLowerCase()}`]: value,
    }),
    {}
  )

/**
 *
 * Function to get CSS String that can be appended to style tag
 *
 * @param selector - The CSS Selector to which the styles are to be applied
 * @param properties - The Object containing the CSS properties
 *
 * @returns {String} CSSString - The CSS string of the properties passed in, which can be directly appended to style tag
 */
export const getCSSString = (
  selector: string,
  properties: ObjectWithStringValues
): string => {
  const rules: string = Object.entries(properties).reduce(
    (str, [key, value]) => `${str} ${key}:${value};`,
    ''
  )
  return `${selector} { ${rules} }`
}
