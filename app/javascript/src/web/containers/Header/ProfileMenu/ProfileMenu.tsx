import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProfileMenuComponent from '../../../components/Header/ProfileMenu'
import { fetchUserDetails } from './ProfileMenu.actions'
import { AppState } from '../../../store'
import { ProfileMenuState } from '.'

export interface ProfileMenuProps {
  fetchUserDetails: typeof fetchUserDetails
  profile: ProfileMenuState
}

const ProfileMenu = (props: ProfileMenuProps) => {
  useEffect(() => {
    props.fetchUserDetails()
  }, [])
  return <ProfileMenuComponent userDetails={props.profile.userDetails.data} />
}

const mapStateToProps = (state: AppState) => ({
  profile: state.header.profile,
})

export default connect(
  mapStateToProps,
  { fetchUserDetails }
)(ProfileMenu)
