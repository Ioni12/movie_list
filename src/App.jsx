import './App.css'
import Api from './Api'
import { ThemeProvider } from './ThemeProvider'
import { ModeToggle } from './ThemeProvider';


function App() {
  

  return (
    <>
      <ThemeProvider>
      <div className="flex justify-end">
        <ModeToggle />
        {/* Other app components */}
      </div>
      </ThemeProvider>
      <Api/>
    </>
  )
}

export default App
