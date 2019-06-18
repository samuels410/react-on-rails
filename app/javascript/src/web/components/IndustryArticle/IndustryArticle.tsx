import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core'
import styles from './IndustryArticle.module.css'
import { IndustryArticleData } from '../../../common/types'

interface Props {
  data: IndustryArticleData
}

const IndustryArticle = (props: Props) => {
  return (
    <a href={props.data.url} target="_blank" rel="noopener noreferrer">
      <Card className={styles.container}>
        <CardMedia className={styles.cardImage} image={props.data.imgUrl} />
        <CardContent className={styles.cardContent}>
          <Grid container direction="column" spacing={2}>
            <Grid item className={styles.articleTitle}>
              <Typography variant="h6" noWrap>
                {props.data.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                className="multiline-limit multiline-limit-body1"
              >
                {props.data.desc}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" className={styles.sourceText}>
                Source: {props.data.source || 'N.A.'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </a>
  )
}

export default IndustryArticle
