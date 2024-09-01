import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent } from "react";
import { FormData } from "../../containers/NavContainer/NavContainer.tsx";

interface ILoginDialog {
  open: boolean;
  onClose: (close?: boolean) => void;
  formData: FormData;
  setFormData: (formData: FormData) => void;
  signUp: boolean;
  handleSignUpChange: () => void;
}

export default function LoginDialog({
  open,
  onClose,
  formData,
  setFormData,
  signUp,
  handleSignUpChange,
}: ILoginDialog) {
  function handleDataInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClose();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose(true)}
        PaperProps={{
          component: "form",
          onSubmit,
        }}
      >
        <DialogTitle sx={{}}>
          {signUp ? "Formularz rejestracyjny" : "Formularz logowania"}{" "}
          <Switch checked={signUp} onChange={handleSignUpChange} />
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={formData.email}
            onChange={handleDataInputChange}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={formData.password}
            onChange={handleDataInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(true)}>Anuluj</Button>
          <Button type="submit">
            {signUp ? "Zarejetruj się" : "Zaloguj się"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
