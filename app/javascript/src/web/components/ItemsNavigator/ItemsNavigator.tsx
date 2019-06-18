import React, { useState } from 'react'
import {
  IconButton,
  Icon,
  Typography,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core'
import AddCircle from '@material-ui/icons/AddCircle'
import StepConnector from '@material-ui/core/StepConnector'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import cx from 'classnames'
import styles from './ItemsNavigator.module.css'
import { ItemID, ModuleItemData } from '../../../common/types'
import { ProgressIcon } from '../Icons'
import LinkButton from '../LinkButton'

export type ItemNavigatorData = {
  title: string
  id: number | string
}

export type ItemsNavigatorData = {
  id: string
  items?: ItemNavigatorData[]
  name?: string
}[]

interface ItemsNavigatorProps {
  items: ItemsNavigatorData
  path: string
  defaultPanel: string | number
  defaultPanelItem: string | number
}

const useStyles = makeStyles(() => ({
  expansionPanelSummary: {},
  expansionPanelSummaryContent: {
    margin: 0,
    flexDirection: 'column',
    overflow: 'hidden',
    '&$expansionPanelSummary': {
      margin: 0,
      marginBottom: 5,
    },
  },
  expansionPanelSummaryRoot: {
    paddingLeft: 16,
    minHeight: 40,
    '&$expansionPanelSummary': {
      minHeight: 40,
      maxHeight: 46,
      paddingLeft: 16,
    },
  },
  expansionPanelDetailsRoot: {
    padding: 0,
  },
  label: {
    textTransform: 'capitalize' as 'capitalize',
  },
  button: {
    width: '100%',
    justifyContent: 'inherit',
    padding: 35,
    paddingBottom: 0,
    paddingTop: 0,
  },
}))

const ItemNavigator = (props: ItemsNavigatorProps) => {
  const classes = useStyles()
  const { items, path, defaultPanel, defaultPanelItem } = props

  const [openValue, setOpenValue] = useState(defaultPanel)

  const handleChange = (value: string) => {
    setOpenValue(openValue === value ? '-1' : value)
  }
  return (
    <div className={styles.container}>
      {items.map(moduleObj => (
        <ExpansionPanel
          square
          expanded={openValue === moduleObj.id}
          onChange={() => {
            handleChange(moduleObj.id)
          }}
          classes={{
            root: styles.module,
            expanded: styles.moduleExpanded,
          }}
          elevation={0}
        >
          <ExpansionPanelSummary
            classes={{
              root: cx(
                classes.expansionPanelSummaryRoot,
                styles.expandedSummaryRoot
              ),
              expanded: cx(
                classes.expansionPanelSummary,
                styles.expandedSummary
              ),
              content: classes.expansionPanelSummaryContent,
            }}
          >
            <div className={styles.expansionContainer}>
              <div style={{ width: 24 }}>
                <ProgressIcon
                  value={100}
                  className={styles.moduleIcon}
                  size={24}
                />
              </div>
              <Typography className={styles.itemTitle} noWrap>
                {moduleObj.name}
              </Typography>
            </div>
            <span
              className={cx(
                styles.verticalLine,
                styles.moduleVerticalLine,
                openValue === moduleObj.id && styles.newHeight
              )}
            />
          </ExpansionPanelSummary>
          {moduleObj.items &&
            moduleObj.items.map(moduleItem => (
              <ExpansionPanelDetails
                classes={{
                  root: classes.expansionPanelDetailsRoot,
                }}
                className={styles.expandedPanelContent}
              >
                <div className={styles.item}>
                  <span
                    className={cx(
                      styles.verticalLine,
                      styles.individualLine,
                      styles.plusSkew
                    )}
                  />
                  <div className={styles.item}>
                    <LinkButton
                      to={`${path}${moduleObj.id}/items/${moduleItem.id}`}
                      className={`${classes.button} ${classes.label}`}
                      style={{ display: 'flex', flexDirection: 'column' }}
                      activeClassName={styles.activeLink}
                      disableRipple
                    >
                      <div className={styles.expansionContainer}>
                        <ProgressIcon
                          value={Math.trunc(Math.random() * 100)}
                          className={styles.icon}
                          size={16}
                        />
                        <Typography
                          className={cx(
                            styles.itemTitle,
                            defaultPanelItem === moduleItem.id.toString() &&
                            styles.activeItemTitle
                          )}
                          noWrap
                        >
                          {moduleItem.title}
                        </Typography>
                      </div>
                    </LinkButton>
                    <span
                      className={cx(
                        styles.verticalLine,
                        styles.itemVerticalLine
                      )}
                    />
                  </div>
                  <span
                    className={cx(
                      styles.verticalLine,
                      styles.individualLine,
                      styles.minusSkew
                    )}
                  />
                </div>
              </ExpansionPanelDetails>
            ))}
        </ExpansionPanel>
      ))}
    </div>
  )
}
export default ItemNavigator
