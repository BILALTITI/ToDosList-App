import "./App.css";
import ToDoList from "./ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToDosProvider  from "./Contexts/toDosContext"; // Corrected import for ToDosProvider
import { ToastProvider } from "./Contexts/ToastContext"; // Corrected import for ToastProvider
import { v4 as uuidv4 } from "uuid";

const initialToDos = [
  // Example ToDo items
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "d;lsdadad",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "مسؤسشسسسسسسسسسسسسسس",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "d;lsdadad",
    isCompleted: false,
  },
];

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Alexandria"],
    },
    palette: {
      primary: {
        main: "#ff3d00",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        {/* Wrapping ToDosProvider around ToDoList */}
        <ToDosProvider>
          <div
        
            className="App"
            style={{
              display: "flex",
							justifyContent: "center",
							alignItems: "center",
							background: "#191b1f",
 							height: "103vh",
							direction: "rtl",
             }}
          >
            <ToDoList/>
          </div>
        </ToDosProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
