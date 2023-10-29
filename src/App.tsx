import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import TaskList from './pages/TaskList/TaskList';

const theme = createTheme();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TaskList />
      </ThemeProvider>
    </>
  )
}

export default App
