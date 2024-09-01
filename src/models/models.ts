import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export interface Appointment extends AppointmentModel {
  userId?: string;
}
