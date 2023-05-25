import{Dialog,Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export const DeleteDialog = ({ isOpen, onClose, onDelete }) => {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this blog post?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  