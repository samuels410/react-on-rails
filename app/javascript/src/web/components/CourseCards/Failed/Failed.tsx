import React from 'react'
import { Button, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { Link } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import styles from './Failed.module.css'
import ReEnroll from '../../../containers/ReEnroll'
import { FailedCourseData } from '../CourseCards.types'

interface State {
  reEnrollModalOpen: boolean
}

interface Props {
  onReEnrollClick: Function
  data: FailedCourseData
}

class Failed extends React.Component<Props, State> {
  static defaultProps = {
    onReEnrollClick: () => null,
  }

  state = {
    reEnrollModalOpen: false,
  }

  openReEnrollModal = () => {
    this.props.onReEnrollClick()
    this.setState({ reEnrollModalOpen: true })
  }

  closeReEnrollModal = () => {
    this.setState({ reEnrollModalOpen: false })
  }

  render() {
    return (
      <Card className={styles.card}>
        <Link
          className={styles.cardLink}
          to={`/courses/${this.props.data.course_id}`}
        />
        <CardMedia
          className={styles.cardMedia}
          image={this.props.data.image_url}
          title={this.props.data.course_name}
        />
        <CardContent className={styles.cardContent}>
          <div className={styles.cardDesc}>
            <Typography gutterBottom variant="h5" className={styles.cardTitle}>
              {this.props.data.course_name}
            </Typography>
            <Typography
              component="p"
              variant="body2"
              className="multiline-limit multiline-limit-body2"
            >
              {this.props.data.desc}
            </Typography>
          </div>
          <Grid container className={styles.metaContainer}>
            <Grid item className={styles.metaLeftBlock}>
              <Button
                classes={{ root: styles.reEnrollBtn }}
                style={{ zIndex: 2 }}
                variant="contained"
                color="primary"
                name="Open ReEnroll Modal"
                onClick={this.openReEnrollModal}
              >
                REENROLL
              </Button>
            </Grid>
            <Grid className={styles.metaRightBlock}>
              <Typography variant="body2" component="p">
                Grade:{' '}
                <Typography component="span" color="error">
                  Incomplete
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <ReEnroll
          open={this.state.reEnrollModalOpen}
          onClose={this.closeReEnrollModal}
          maxWidth="sm"
        />
      </Card>
    )
  }
}

export default Failed
