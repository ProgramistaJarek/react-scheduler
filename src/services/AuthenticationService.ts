import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const createUser = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);

    return user.user;
  } catch (e) {
    console.error(e);
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user.user;
  } catch (e) {
    console.error(e);
  }
};

export const singOutUser = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);

    return true;
  } catch (e) {
    console.error(e);
  }
};
