import NavComponent from "../../components/NavComponent/NavComponent.tsx";
import { useEffect, useState } from "react";
import {
  createUser,
  signInUser,
  singOutUser,
} from "../../services/AuthenticationService.ts";
import LoginDialog from "../../components/LoginDialog/LoginDialog.tsx";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useSnackbar } from "../../components/SnackbarComponent/SnackbarComponent.tsx";

export interface FormData {
  email: string;
  password: string;
  signUp?: boolean;
}

export default function NavContainer() {
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState(false);

  const { showMessage } = useSnackbar();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLogin(true);
        setOpen(false);
        setFormData({ email: "", password: "" });
      } else {
        setIsLogin(false);
        setUser(undefined);
      }
    });
  }, []);

  function handleLoginModal() {
    setOpen(true);
  }

  function handleCloseLoginModal(close?: boolean) {
    if (close) {
      setOpen(false);
      setSignUp(false);
      setFormData({ email: "", password: "" });
      return;
    }

    if (formData?.signUp) {
      onCreateUser(formData);
      return;
    }

    onSignInUser(formData);
  }

  function handleSignUpChange() {
    setFormData({ ...formData, signUp: !signUp });
    setSignUp(!signUp);
  }

  async function handleLogout() {
    const res = await singOutUser();
    if (res) showMessage("Wylogowano pomyślnie.");
  }

  async function onCreateUser(formData: FormData) {
    const res = await createUser(formData.email, formData.password);

    if (res) {
      showMessage("Pomyślnie utworzono konto.");
      setSignUp(false);
    } else {
      showMessage("Wystąpił błąd podczas tworzenia konta.");
    }
  }

  async function onSignInUser(formData: FormData) {
    const res = await signInUser(formData.email, formData.password);

    if (res) {
      setSignUp(false);
    } else {
      showMessage("Niepoprawne dane.");
    }
  }

  return (
    <>
      <NavComponent
        isLogin={isLogin}
        handleLoginModal={handleLoginModal}
        handleLogout={handleLogout}
        user={user}
      />

      <LoginDialog
        open={open}
        onClose={handleCloseLoginModal}
        formData={formData}
        setFormData={setFormData}
        signUp={signUp}
        handleSignUpChange={handleSignUpChange}
      />
    </>
  );
}
