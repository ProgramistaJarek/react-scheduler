import {
  AppointmentForm as AppointmentFormBase,
  ChangeSet,
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  DragDropProvider,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Appointment } from "../../models/models.ts";

interface ISchedulerComponent {
  schedulerData: Appointment[];
  currentDate: Date;
  currentViewName: string;
  setCurrentViewName: (viewName: string) => void;
  handleCommitChanges: ({ added, changed, deleted }: ChangeSet) => void;
}

export default function SchedulerComponent({
  schedulerData,
  currentDate,
  currentViewName,
  setCurrentViewName,
  handleCommitChanges,
}: ISchedulerComponent) {
  const appointmentFormMessages: AppointmentFormBase.LocalizationMessages = {
    titleLabel: "Tytuł",
    detailsLabel: "Tytuł",
    allDayLabel: "Cały dzień",
    repeatLabel: "Powtórz",
    moreInformationLabel: "Informacje",
    notesLabel: "Notatki",
    commitCommand: "Zapisz",
    daily: "Dziennie",
    weekly: "Tygodniowo",
    monthly: "Miesięcznie",
    yearly: "Rocznie",
    everyLabel: "Co",
    afterLabel: "Po",
    monthsLabel: "miesiąc/e",
    daysLabel: "dni",
    yearsLabel: "rok",
    repeatEveryLabel: "Powtórz co",
    weeksOnLabel: "tygodnie",
    ofEveryMonthLabel: "miesiącu/ach",
    endRepeatLabel: "Zakończ powtarzanie",
    never: "Nigdy",
    occurrencesLabel: "powtórzeniach",
    onLabel: "Po",
    ofLabel: "",
    theLabel: "Co",
    firstLabel: "Pierwszy",
    secondLabel: "Drugi",
    thirdLabel: "Trzecie",
    fourthLabel: "Czwarty",
    lastLabel: "Ostatni",
  };

  return (
    <>
      <Scheduler data={schedulerData} locale={"pl-PL"} firstDayOfWeek={1}>
        <ViewState
          defaultCurrentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
        />

        <EditingState onCommitChanges={handleCommitChanges} />
        <IntegratedEditing />

        <WeekView displayName="Tydzień" />
        <MonthView displayName="Miesiąc" />
        <DayView displayName="Dzień" />

        <AllDayPanel messages={{ allDay: "Dzień" }} />

        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm messages={appointmentFormMessages} />
        <DragDropProvider allowDrag={() => true} allowResize={() => true} />

        <Toolbar />
        <TodayButton messages={{ today: "Dzisiaj" }} />
        <DateNavigator />
        <ViewSwitcher />
      </Scheduler>
    </>
  );
}
