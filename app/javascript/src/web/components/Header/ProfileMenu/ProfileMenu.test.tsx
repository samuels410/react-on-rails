import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import ProfileMenu from './ProfileMenu'
import { UserDetailsData } from '..'

describe('ProfileMenu', () => {
  const mockData: UserDetailsData = {
    id: 1,
    name: 'test user',
    imageUrl:
      'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?cs=srgb&dl=animal-chihuahua-cute-39317.jpg&fm=jpg',
  }

  const renderComponent = (data: UserDetailsData) =>
    render(<ProfileMenu userDetails={data} />)

  test('Able to open and close profile menu', () => {
    const { getByTestId, queryByText } = renderComponent(mockData)
    const profileBtn = getByTestId('profile')
    expect(profileBtn).toBeTruthy()

    expect(queryByText(new RegExp('logout', 'i'))).toBeFalsy()

    fireEvent.click(profileBtn)
    expect(queryByText(new RegExp('logout', 'i'))).toBeTruthy()
  })
  test('show empty image thumbnail when image url is not available', () => {
    const mockDataWithNoImageUrl = { ...mockData, imageUrl: null }
    const { getByTestId } = renderComponent(mockDataWithNoImageUrl)
    const profileImg = getByTestId('profile-image')

    expect(profileImg).not.toContainHTML('img')
  })
  test('show default user name when user name is not available', () => {
    const mockDataWithNoUserName = { ...mockData, name: null }
    const { getByTestId } = renderComponent(mockDataWithNoUserName)
    const profileName = getByTestId('profile-name')

    expect(profileName).toBeEmpty()
  })
})
