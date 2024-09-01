import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { getAuth } from "firebase/auth";
import { Appointment } from "../models/models.ts";

const collection_name = import.meta.env.VITE_APPOINTMENTS;

export const getAppointments = async (): Promise<Appointment[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  let appointmentsQuery;
  if (user)
    appointmentsQuery = query(
      collection(firestore, collection_name),
      where("userId", "==", user.uid),
    );
  else
    appointmentsQuery = query(
      collection(firestore, collection_name),
      where("userId", "==", null),
    );

  const docRef = await getDocs(appointmentsQuery);

  const appointments: Appointment[] = [];
  docRef.forEach((doc) => {
    appointments.push({
      ...doc.data(),
      id: doc.id,
      startDate: new Date(doc.data().startDate?.seconds * 1000),
      endDate: new Date(doc.data().endDate?.seconds * 1000),
    } as Appointment);
  });

  return appointments;
};

export const addAppointment = async (data: Appointment) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const newAppointment = {
    ...data,
    userId: user ? user.uid : null,
  };

  return addDoc(collection(firestore, collection_name), newAppointment);
};

export const editAppointment = async (data: Appointment) => {
  const appointmentDoc = doc(firestore, collection_name, data.id as string);
  return setDoc(appointmentDoc, data);
};

export const deleteAppointment = async (id: string) => {
  const appointmentDoc = doc(firestore, collection_name, id);
  return deleteDoc(appointmentDoc);
};
