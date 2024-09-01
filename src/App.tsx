import "./App.css";
import SchedulerContainer from "./containers/SchedulerContainer/SchedulerContainer.tsx";
import NavContainer from "./containers/NavContainer/NavContainer.tsx";
import SnackbarProvider from "./components/SnackbarComponent/SnackbarComponent.tsx";

function App() {
  return (
    <>
      <SnackbarProvider>
        <NavContainer />
        <SchedulerContainer />
      </SnackbarProvider>
    </>
  );
}

export default App;
