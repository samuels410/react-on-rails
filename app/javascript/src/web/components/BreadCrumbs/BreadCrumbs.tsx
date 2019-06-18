import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import BreadCrumbsData from './BreadCrumbs.types'
import styles from './BreadCrumbs.module.css'

interface BreadCrumbsProps {
  breadCrumbs: BreadCrumbsData[]
}

const BreadCrumbs = (props: BreadCrumbsProps) => (
  <div>
    <Breadcrumbs aria-label="Breadcrumb">
      {props.breadCrumbs.map(path =>
        path.pathUrl ? (
          <Link className={styles.pathLink} color="inherit" to={path.pathUrl}>
            {path.pathName}
          </Link>
        ) : (
          <Typography className={styles.pathLink}>{path.pathName}</Typography>
        )
      )}
    </Breadcrumbs>
  </div>
)

export default BreadCrumbs
