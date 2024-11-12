import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles } from '@material-ui/core'
import { Button } from '@mui/material';

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(35)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
               
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} >
                        No
                </Button>
                <Button
                    
                    onClick={confirmDialog.onConfirm} >
                        Yes
                        </Button>
                
            </DialogActions>
        </Dialog>
    )
}