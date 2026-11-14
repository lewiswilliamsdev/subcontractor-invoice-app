import './App.css'

import { useState } from 'react'

import TimesheetForm from './components/TimesheetForm/TimesheetForm'

function App() {
  const [timesheetEntries, setTimesheetEntries] = useState([])

  function addTimesheetEntry(timesheetForm) {
    const newTimesheet = {
      id: crypto.randomUUID(),
      date: timesheetForm.date,
      location: timesheetForm.location,
      startTime: timesheetForm.startTime,
      endTime: timesheetForm.endTime,
      unpaidBreakDuration: timesheetForm.unpaidBreakDuration,
      totalHours: timesheetForm.totalHours,
      totalPaidHours: timesheetForm.totalPaidHours,
      rateMultiplier: timesheetForm.rateMultiplier,
      totalMiles: timesheetForm.totalMiles
    }

    setTimesheetEntries(previousEntries => [
      newTimesheet,
      ...previousEntries
    ])
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
