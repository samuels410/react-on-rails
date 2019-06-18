import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import Badge from '@material-ui/core/Badge'
import HelpIcon from '@material-ui/icons/HelpRounded'
import cx from 'classnames'
import { Tooltip, Theme } from '@material-ui/core'
import colors from '../../styles/colors'
import styles from './Header.module.css'
import Logo from '../../../common/images/logo.png'
import LinkButton from '../LinkButton'

const useStyles = makeStyles((theme: Theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline',
    },
    marginLeft: 'auto',
  },
  pageLinks: {
    marginLeft: theme.spacing(5),
  },
  button: {
    margin: theme.spacing(1),
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    color: colors.lightGray,
  },
  label: {
    textTransform: 'capitalize' as 'capitalize',
  },
  iconButton: {
    marginRight: 30,
  },
  helpIconButton: {
    marginRight: 10,
  },
  badge: {
    height: 20,
  },
  logoContainer: {
    width: 150,
  },
  icon: {
    width: '1em',
    height: '1em',
  },
  logo: {
    width: '100%',
  },
}))

interface HeaderProps {
  onNotificationsClick: Function
  onHelpClick: Function
}

const Header = (props: HeaderProps) => {
  const classes = useStyles()

  const helpOpen = () => {
    props.onHelpClick()
  }
  const notificationsOpen = () => {
    props.onNotificationsClick()
  }
  return (
    <div className={styles.container}>
      <div className={classes.logoContainer}>
        <NavLink to="/">
          <img className={classes.logo} src={Logo} alt="GreatLearning Logo" />
        </NavLink>
      </div>
      <div className={classes.pageLinks}>
        <LinkButton
          to="/dashboard"
          className={`${classes.button} ${classes.label}`}
          key="Dashboard"
          activeClassName={styles.activeLink}
          disableRipple
        >
          Dashboard
        </LinkButton>
        <LinkButton
          to="/courses"
          className={`${classes.button} ${classes.label}`}
          activeClassName={styles.activeLink}
          key="Courses"
          disableRipple
        >
          Courses
        </LinkButton>
        <LinkButton
          to="/excelerate"
          className={`${classes.button} ${classes.label}`}
          key="Excelerate"
          activeClassName={styles.activeLink}
          disableRipple
        >
          Excelerate
        </LinkButton>
      </div>
      <div className={classes.sectionDesktop}>
        <Tooltip title="Help">
          <IconButton
            className={cx(classes.iconButton, classes.helpIconButton)}
            onClick={helpOpen}
          >
            <HelpIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton
            className={classes.iconButton}
            onClick={notificationsOpen}
          >
            <Badge badgeContent={17}>
              <NotificationsIcon className={classes.icon} />
            </Badge>
          </IconButton>
        </Tooltip>
        {/* <ProfileMenu /> */}
      </div>
    </div>
  )
}

Header.defaultProps = {
  onHelpClick: () => null,
  onNotificationsClick: () => null,
}

export default Header
