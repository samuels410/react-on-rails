import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { CourseID } from '../../../common/types'
import { fetchIndustryArticles } from './IndustryArticles.actions'
import { IndustryArticlesState } from './IndustryArticles.reducer'
import AsyncDOM from '../../components/AsyncDOM'
import Loader from '../../components/Loader'
import IndustryArticle from '../../components/IndustryArticle'
import { AppState } from '../../store'
import styles from './IndustryArticles.module.css'

interface OwnProps {
  courseId: CourseID
}
interface StateProps {
  industryArticlesData: IndustryArticlesState['data']['byId']
  industryArticlesAPI: IndustryArticlesState['byCourse']['x']
}
interface DispatchProps {
  fetchIndustryArticles: typeof fetchIndustryArticles
}
type Props = DispatchProps & StateProps & OwnProps

export const IndustryArticles = (props: Props) => {
  useEffect(() => {
    if (!props.industryArticlesAPI || !props.industryArticlesAPI.loading) {
      const { courseId } = props
      props.fetchIndustryArticles({ courseId }, { courseId })
    }
  }, [])
  if (!props.industryArticlesAPI) {
    return null
  }
  const isDataAvailable = props.industryArticlesAPI.data.length > 0
  return (
    <div className={styles.container}>
      <AsyncDOM data={props.industryArticlesAPI.data.length > 0}>
        <AsyncDOM.Loader
          show={props.industryArticlesAPI.loading && !isDataAvailable}
        >
          <Loader />
        </AsyncDOM.Loader>
        <AsyncDOM.Content>
          <Grid container spacing={4}>
            {props.industryArticlesAPI.data.map(articleId =>
              props.industryArticlesData[articleId] ? (
                <Grid item xs={12} key={articleId} zeroMinWidth>
                  <IndustryArticle
                    data={props.industryArticlesData[articleId]!}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AsyncDOM.Content>
      </AsyncDOM>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  industryArticlesData: state.industryArticles.data.byId,
  industryArticlesAPI: state.industryArticles.byCourse[ownProps.courseId],
})

export default connect(
  mapStateToProps,
  { fetchIndustryArticles }
)(IndustryArticles)
