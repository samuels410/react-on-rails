import React, { Fragment } from 'react'
import { Button, Typography, Menu, MenuItem, Avatar } from '@material-ui/core'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import styles from './ProfileMenu.module.css'
import { UserDetailsData } from '..'

interface ProfileProps {
  onProfileClick: Function
  userDetails: UserDetailsData | null | Error
}

const ProfileMenu = (props: ProfileProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    props.onProfileClick()
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const userImage = () => {
    if (
      props.userDetails &&
      'imageUrl' in props.userDetails &&
      props.userDetails.imageUrl !== null
    )
      return props.userDetails.imageUrl
    return undefined
  }

  const userName = () => {
    if (props.userDetails && 'name' in props.userDetails)
      return props.userDetails.name
    return 'User'
  }

  return (
    <Fragment>
      <Button
        className={styles.profileMenuButton}
        data-testid="profile"
        aria-owns={anchorEl ? 'profile-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          src={userImage()}
          className={styles.avatar}
          data-testid="profile-image"
        />
        <Typography align="inherit" variant="body2" data-testid="profile-name">
          {userName()}
        </Typography>
        <ArrowDropDown />
      </Button>
      <Menu
        id="profile-menu"
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Switch Program</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Payments and Receipts</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Refer and Earn</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

ProfileMenu.defaultProps = {
  onProfileClick: () => null,
}

export default ProfileMenu
