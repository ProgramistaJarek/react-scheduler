import { Snackbar, SnackbarCloseReason } from "@mui/material";
import {
  createContext,
  ReactNode,
  SyntheticEvent,
  useContext,
  useState,
} from "react";

interface SnackbarContextProps {
  showMessage: (message: string, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export default function SnackbarProvider ({
  children,
}: {
  children: ReactNode;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(3000);

  const showMessage = (msg: string, duration: number = 3000) => {
    setMessage(msg);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (
    _event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        message={message}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}
