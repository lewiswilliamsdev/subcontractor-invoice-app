import './App.css'

import { useState } from 'react'

import TimesheetForm from './assets/components/TimesheetForm/TimesheetForm'

function App() {
  const [timesheetEntries, setTimesheetEntries] = useState([])

  function addTimesheetEntry(timesheetForm) {
    console.log(timesheetForm)
  }

  return (
    <TimesheetForm
    onAddTimesheet={addTimesheetEntry}
    />
  )
}

export default App
