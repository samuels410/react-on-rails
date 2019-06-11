import React from 'react'
import HelloWorld from './Hello'
import {render} from 'react-testing-library'


describe('Hello', () => {
    test('Sample test case', () => {
        expect(() => render(<HelloWorld message={'sdfsd'}/>)).not.toThrow()
    })
})