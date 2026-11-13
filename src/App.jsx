import './App.css'

import { useState } from 'react'

import TimesheetForm from './assets/components/TimesheetForm/TimesheetForm'

function App() {
  const [timesheetEntries, setTimesheetEntries] = useState([])

  function addTimesheetEntry(timesheetForm) {
    console.log(timesheetForm)
  }

  return (
    <div className="app">
      <main className="app-main">
        <TimesheetForm
        onAddTimesheet={addTimesheetEntry}
        />
      </main>
    </div>
  )
}

export default App
