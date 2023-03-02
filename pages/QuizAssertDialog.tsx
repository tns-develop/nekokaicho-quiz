import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";

// クイズの回答結果を表示するダイアログを表示する
const QuizAssertDialog = () => {
  // MUIのDialogを表示するためのstate
  const [open, setOpen] = React.useState(false);

  // MUIのDialogを表示
  const handleClickOpen = () => {
    setOpen(true);
  };

  // MUIのDialogを非表示
  const handleClose = () => {
    setOpen(false);
  };

  // MUIのDialog
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>回答結果</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h5" component="div" gutterBottom>
              {/* 正解数：{correctCount} */}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              {/* 不正解数：{incorrectCount} */}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default QuizAssertDialog;