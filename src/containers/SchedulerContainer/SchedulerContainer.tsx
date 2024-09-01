import { useEffect, useState } from "react";
import SchedulerComponent from "../../components/SchedulerComponent/SchedulerComponent.tsx";
import { ChangeSet, SchedulerDateTime } from "@devexpress/dx-react-scheduler";
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
  getAppointments,
} from "../../services/SchedulerService.ts";
import { Appointment } from "../../models/models.ts";
import { Box, CircularProgress, Paper } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSnackbar } from "../../components/SnackbarComponent/SnackbarComponent.tsx";

export default function SchedulerContainer() {
  const [currentViewName, setCurrentViewName] = useState("Week");
  const [schedulerData, setSchedulerData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const { showMessage } = useSnackbar();

  const currentDate = new Date();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, () => {
      fetchAppointments();
    });
  }, []);

  async function fetchAppointments() {
    try {
      if (!loading) setLoading(true);
      const res = await getAppointments();
      setSchedulerData(res);
    } catch (e) {
      showMessage("Wystąpił błąd podczas pobierania kalendarza.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleCommitChanges({ added, changed, deleted }: ChangeSet) {
    if (added) handleNewAppointmentDate(added as Appointment);
    if (changed) handleEditAppointmentDate(changed as Appointment);
    if (deleted !== undefined) handleDeleteAppointmentDate(deleted);
  }

  async function handleNewAppointmentDate(added: Appointment) {
    const modifiedAppointment: Appointment = fixAppointment(added);

    try {
      await addAppointment(modifiedAppointment);
      await fetchAppointments();
    } catch (e) {
      showMessage("Wystąpił błąd.");
      console.error(e);
    }
  }

  async function handleEditAppointmentDate(changed: Appointment) {
    const changedData: Appointment[] = schedulerData.map((appointment) =>
      changed[appointment.id!]
        ? { ...appointment, ...changed[appointment.id!] }
        : appointment,
    );

    const id: string = Object.keys(changed)[0];
    const editObject: Appointment = changedData.find(
      (appointment) => appointment.id === id,
    )!;
    const fixEdit: Appointment = fixAppointment(editObject);

    try {
      await editAppointment(fixEdit);
      await fetchAppointments();
    } catch (e) {
      showMessage("Wystąpił błąd.");
      console.error(e);
    }
  }

  async function handleDeleteAppointmentDate(deleted: number | string) {
    if (typeof deleted === "string") {
      try {
        await deleteAppointment(deleted);
        await fetchAppointments();
      } catch (e) {
        showMessage("Wystąpił błąd.");
        console.error(e);
      }
    }
  }

  function fixAppointment(data: Appointment): Appointment {
    return {
      ...data,
      rRule: data.rRule === undefined ? "" : data.rRule,
      exDate: data.exDate === undefined ? "" : data.exDate,
      allDay: checkIfAllDay(data.startDate, data.endDate),
    };
  }

  function checkIfAllDay(
    startDate: SchedulerDateTime,
    endDate?: SchedulerDateTime,
  ) {
    if (endDate === undefined) return false;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end.getTime() - start.getTime();
    return timeDifference === 24 * 60 * 60 * 1000;
  }

  function handleCurrentViewName(viewName: string) {
    setCurrentViewName(viewName);
    fetchAppointments();
  }

  return (
    <>
      <Paper
        sx={{
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              backgroundColor: "rgba(255,255,255, 0.6)",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <SchedulerComponent
          schedulerData={schedulerData}
          currentDate={currentDate}
          currentViewName={currentViewName}
          setCurrentViewName={handleCurrentViewName}
          handleCommitChanges={handleCommitChanges}
        />
      </Paper>
    </>
  );
}
