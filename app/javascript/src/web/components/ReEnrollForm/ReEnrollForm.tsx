import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Button,
} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps,
} from '../Dialog'
import styles from './ReEnroll.module.css'

interface ReEnrollFormValues {
  reason: string
  comments: string
}

export interface Props extends DialogProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onFormSubmit: (values: ReEnrollFormValues) => void
  reason?: string
  comments?: string
}

interface State {
  reason: string
  comments: string
}

class ReEnrollForm extends React.Component<Props, State> {
  state = {
    reason: this.props.reason || '',
    comments: this.props.comments || '',
  }

  handleReasonChange = (e: React.ChangeEvent<{}>, value: string) =>
    this.setState(
      {
        reason: value,
      },
      () => console.log(112, this.state)
    )

  handleCommentsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) =>
    this.setState({
      comments: e.target.value,
    })

  onFormSubmit = () => {
    const formValues: ReEnrollFormValues = {
      reason: this.state.reason,
      comments: this.state.comments,
    }
    this.props.onFormSubmit(formValues)
  }

  render() {
    const { onClose, ...props } = this.props
    return (
      <Dialog className={styles.container} onClose={onClose} {...props}>
        <DialogTitle onClose={onClose}>ReEnroll Form</DialogTitle>
        <DialogContent className={styles.content}>
          <form className={styles.form}>
            <FormControl
              component={'fieldset' as any}
              className={styles.formControl}
            >
              <FormLabel component={'legend' as any}>
                <Typography variant="h6">
                  What went wrong with your course?
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-label="What went wrong with your course?"
                name="reason"
                className={styles.group}
                value={this.state.reason}
                onChange={this.handleReasonChange}
              >
                <FormControlLabel
                  value="I was unable to spend time"
                  control={<Radio />}
                  label="I was unable to spend time"
                />
                <FormControlLabel
                  value="I was travelling, so I couldn't spend time"
                  control={<Radio />}
                  label="I was travelling, so I couldn't spend time"
                />
                <FormControlLabel
                  value="Some topics were not clear for me"
                  control={<Radio />}
                  label="Some topics were not clear for me"
                />
                <FormControlLabel
                  value="Unable to go along with batch speed"
                  control={<Radio />}
                  label="Unable to go along with batch speed"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <FormControl
              component={'fieldset' as any}
              className={styles.formControl}
            >
              <TextField
                id="filled-full-width"
                multiline
                label="Comments"
                placeholder="Enter comments here"
                fullWidth
                value={this.state.comments}
                onChange={this.handleCommentsChange}
                rows="4"
                margin="normal"
                variant="filled"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="flex-end">
            <Button
              className={styles.formButton}
              onClick={onClose}
              size="medium"
            >
              Cancel
            </Button>
            <Button
              className={styles.formButton}
              onClick={this.onFormSubmit}
              size="medium"
              variant="contained"
              color="primary"
            >
              SUBMIT
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    )
  }
}

export default ReEnrollForm
