
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({isError, onClose}) {

  return (
    <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center'}}>
      <Collapse in={isError}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="warning"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: -6,padding: 1}}
        >
          City Not Found!
        </Alert>
      </Collapse>
    </Box>
  );
}
