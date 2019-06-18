import { stringify as stringifyBase } from 'query-string'
import { call, take, race } from 'redux-saga/effects'
import { ObjectWithStringValues, NestedObjectWithStringValues } from '../types'

/**
 * Used to flatten a nested object with string values
 *
 * @param obj - The object to be flattened
 * @param prefix - If a prefix is needed for the first level in the object
 * @param separator - The separator to be used to join the keys
 *
 * @example
 * flatten({ a: { b: { c: 'd', e: 'f'}}},'','.')
 * // returns {"a.b.c": "d","a.b.e": "f" }
 */
export const flatten = (
  obj: NestedObjectWithStringValues,
  prefix: string = '',
  separator: string = '.'
): ObjectWithStringValues =>
  Object.keys(obj).reduce(
    (prev, element) =>
      obj[element] &&
      typeof obj[element] === 'object' &&
      !Array.isArray(obj[element])
        ? {
            ...prev,
            ...flatten(
              obj[element] as NestedObjectWithStringValues,
              `${prefix}${element}${separator}`,
              separator
            ),
          }
        : { ...prev, ...{ [`${prefix}${element}`]: obj[element] } },
    {}
  )

export const readableDate = (date: number | string) => {
  try {
    return Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      day: '2-digit',
      month: 'short',
    }).format(new Date(date))
  } catch {
    return date
  }
}

export const cancelable = (saga: any, cancelAction: string) =>
  function* util(...args: any[]) {
    yield race([call(saga, ...args), take(cancelAction)])
  }

/**
 *
 * @param time - Time in milliseconds
 *
 * @example
 * await sleep(1000)
 *
 * // To await for 1000 milliseconds
 */
export const sleep = (time: number) => new Promise(res => setTimeout(res, time))

export const stringify = (params: any) =>
  stringifyBase(params, { arrayFormat: 'bracket' })

export const minutesToText = (numberOfMinutes: number): string => {
  const time: { [s: string]: number } = {}
  time.h = Math.trunc(numberOfMinutes / 60)
  time.m = numberOfMinutes % 60
  return Object.entries(time)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${value}${key}`)
    .join(' ')
}

export const getDurationString = (durationInSeconds: number): string => {
  let hours: string | number = Math.trunc(durationInSeconds / 3600)
  let minutes: string | number = Math.trunc((durationInSeconds % 3600) / 60)
  let seconds: string | number = Math.trunc(durationInSeconds % 60)

  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${hours}:${minutes}:${seconds}`
}

export const pick = <T, K extends keyof T>(obj: T, list: K[]) => {
  return list.map(id => obj[id]).filter(Boolean)
}
