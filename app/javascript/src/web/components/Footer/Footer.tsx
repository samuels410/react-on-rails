import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import FooterBase from '../FooterBase'
import styles from './Footer.module.css'

const Footer = () => (
  <FooterBase>
    <div className={styles.container}>
      <Typography variant="body2" className={styles.copyright}>
        &copy; {new Date().getFullYear()} All rights reserved
      </Typography>
      <Grid container className={styles.footerLinks} spacing={4}>
        <Grid item>
          <Link className={styles.footerLink} to="/privacy">
            <Typography variant="body2">Privacy</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link className={styles.footerLink} to="/terms">
            <Typography variant="body2">Terms of service</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link className={styles.footerLink} to="/help">
            <Typography variant="body2">Help</Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  </FooterBase>
)

export default Footer
