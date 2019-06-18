import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@material-ui/core'
import styles from './CourseGrades.module.css'
import { GradedItemData } from '../../../common/types'
import { readableDate } from '../../../common/utils'

interface Props {
  data: GradedItemData[]
}

const CourseGrades = (props: Props) => {
  return (
    <Table className={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Course Item</TableCell>
          <TableCell>Marks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map(row => (
          <TableRow key={row.id}>
            <TableCell>{readableDate(row.date)}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CourseGrades
