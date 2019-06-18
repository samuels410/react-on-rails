import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import BookmarkBorder from '@material-ui/icons/BookmarkBorder'
import ThumbDown from '@material-ui/icons/ThumbDown'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import { ModuleItemData, ItemID } from '../../../../../common/types'
import styles from './MainContent.module.css'
import VideoContentItem from '../../../../components/CourseContentItem'
import LinkButton from '../../../../components/LinkButton'
import { AppState } from '../../../../store'
import { CourseModuleItemsState } from '../../../CourseContent/CourseModule'
import { fetchCourseItemContent } from '../../../CourseContent/CourseModule/CourseItem'
import Loader from '../../../../components/Loader'

const useStyles = makeStyles(() => ({
  label: {
    textTransform: 'capitalize' as 'capitalize',
  },
}))

interface MainContentProps {
  itemData: ModuleItemData
  itemId: ItemID
  moduleItems: CourseModuleItemsState
  fetchCourseItemContent: typeof fetchCourseItemContent
}

const MainContent = (props: MainContentProps) => {
  const classes = useStyles()
  const { itemData, moduleItems, itemId } = props
  console.log('moduleItems', moduleItems)

  useEffect(() => {
    if (!itemData.itemContent && 'url' in itemData && itemData.url) {
      props.fetchCourseItemContent(
        { url: itemData.url },
        { itemId: itemData.id }
      )
    }
  }, [itemId])

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.mainContentHeader}>
          <span className={styles.itemTitle}> {itemData.title} </span>
          <IconButton className={styles.bookmark}>
            <BookmarkBorder className={styles.thumbIcon} />
          </IconButton>
        </div>
        {'itemContent' in itemData &&
        !(itemData instanceof Error) &&
        itemData.type === 'Page' ? (
          <VideoContentItem itemData={itemData} />
        ) : (
          <Loader />
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.reportBar}>
          <div className={styles.report}>
            <span style={{ fontSize: 13 }}>Was this content useful?</span>
            <IconButton>
              <ThumbUp className={styles.thumbIcon} />
            </IconButton>
            <IconButton>
              <ThumbDown className={styles.thumbIcon} />
            </IconButton>
          </div>
          <LinkButton to="/courses" color="primary" className={classes.label}>
            Report
          </LinkButton>
        </div>
        <div className={styles.navigationButtons}>
          <LinkButton
            variant="contained"
            to="/courses"
            key="Courses"
            className={cx(classes.label, styles.label)}
          >
            <ChevronLeft />
            Previous
          </LinkButton>
          <LinkButton
            variant="contained"
            to="/courses"
            key="Courses"
            className={cx(classes.label, styles.label)}
          >
            Next
            <ChevronRight />
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  moduleItems: state.moduleItems,
})

export default connect(
  mapStateToProps,
  { fetchCourseItemContent }
)(MainContent)
