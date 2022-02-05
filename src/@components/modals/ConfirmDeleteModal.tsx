import { Dialog } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Button } from "@components";

interface SaveCollectionModalProps {
  onClose: any;
  open: boolean;
  onConfirm: any;
  onCancel: any;
}

const SaveCollectionModal: React.FC<SaveCollectionModalProps> = (props) => {
  const { onClose, open, onConfirm, onCancel } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="flex flex-col items-center px-8 py-6">
        <PsychologyIcon className="text-8xl mb-2 text-primary" />
        <p className="my-4">Are you sure you want to delete this?</p>
        <div className="flex justify-between px-2 space-x-2">
          <Button onClick={onConfirm} color="secondary">
            Confirm
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default SaveCollectionModal;
