import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Paper, IconButton, Drawer, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import NavigationContent from './NavigationContent'
import styles from './ItemContent.module.css'
import AsyncDOM from '../../../components/AsyncDOM'
import {
  fetchCourseModules,
  CourseModulesState,
  CourseModulesFetchParams,
} from '../../CourseContent/CourseModules'
import { AppState } from '../../../store'
import { CourseID, ItemID, ModuleID } from '../../../../common/types'
import Loader from '../../../components/Loader'
import OpenDrawerIcon from '../../../components/Icons/OpenDrawer/OpenDrawer'
import CloseDrawerIcon from '../../../components/Icons/CloseDrawer/CloseDrawer'
import { CourseModuleItemsState } from '../../CourseContent/CourseModule'
import MainContent from './MainContent'

const drawerWidth = 300

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: 'auto',
    overflow: 'hidden',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    zIndex: 'auto',
    paddingTop: 10,
    paddingBottom: 20,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    overflow: 'hidden',
  },
  iconRoot: {
    padding: 7,
    fontSize: 1,
  },
}))

interface ItemContentProps {
  courseId: CourseID
  fetchCourseModules: typeof fetchCourseModules
  modules: CourseModulesState
  moduleItems: CourseModuleItemsState
  itemId: ItemID
  moduleId: ModuleID
}

const ItemContent = (props: ItemContentProps) => {
  const classes = useStyles()
  const [drawerMode, setDrawerMode] = useState(true)

  const { courseId, moduleId, itemId } = props
  const modulesData = props.modules.byCourse[courseId] || {}
  const itemData = props.moduleItems.data.byId[itemId]

  useEffect(() => {
    const params: CourseModulesFetchParams = {
      courseId,
    }
    if (!modulesData.data) {
      props.fetchCourseModules(params, { courseId })
    }
  }, [])

  const drawerOpen = () => {
    setDrawerMode(true)
  }
  const drawerClose = () => {
    setDrawerMode(false)
  }
  return (
    <AsyncDOM data={!!modulesData.data}>
      <AsyncDOM.Loader show={modulesData.loading && !modulesData.data}>
        <Loader />
      </AsyncDOM.Loader>

      <AsyncDOM.Content>
        <div className={styles.container}>
          <Paper className={styles.paper}>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={drawerMode}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Typography variant="h6" style={{ padding: 10 }}>
                Content
              </Typography>
              <NavigationContent
                courseId={courseId}
                moduleId={moduleId}
                itemId={itemId}
              />
            </Drawer>
            <main
              className={cx(classes.content, {
                [classes.contentShift]: drawerMode,
              })}
            >
              {itemData && <MainContent itemData={itemData} itemId={itemId} />}
              <div className={styles.drawerIcons}>
                <IconButton
                  classes={{ root: classes.iconRoot }}
                  onClick={!drawerMode ? drawerOpen : drawerClose}
                >
                  {!drawerMode ? <OpenDrawerIcon /> : <CloseDrawerIcon />}
                </IconButton>
              </div>
            </main>
          </Paper>
        </div>
      </AsyncDOM.Content>
    </AsyncDOM>
  )
}

const mapStateToProps = (state: AppState) => ({
  modules: state.modules,
  moduleItems: state.moduleItems,
})

export default connect(
  mapStateToProps,
  { fetchCourseModules }
)(ItemContent)
