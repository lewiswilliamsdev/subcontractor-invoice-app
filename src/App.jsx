import './App.css'

import { useState } from 'react'

import TimesheetForm from './components/TimesheetForm/TimesheetForm'
import Timesheet from './components/Timesheet/Timesheet'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHelmetSafety,
  faGear,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [timesheetEntries, setTimesheetEntries] = useState([])

  const [timesheetFormOpen, setTimesheetFormOpen] = useState(null)

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

    setTimesheetFormOpen(null);
  }

  const [timesheetToEdit, setTimesheetToEdit] = useState(null)

  const timesheets = timesheetEntries.map(function(timesheet) {
    return <Timesheet
      key={timesheet.id}
      timesheet={timesheet}
      className= "timesheet-card"
      onEdit={editTimeSheet}
    />
  })

  function editTimeSheet(timesheetToEdit) {
    setTimesheetToEdit(timesheetToEdit);

    setTimesheetFormOpen(true);
  }

  function updateTimesheetEntry(timesheetId, updatedTimesheet) {
    setTimesheetEntries(previousEntries => {
      return previousEntries.map(function(timesheet) {
        if (timesheet.id === timesheetId) {
          return {
            ...timesheet,
            date: updatedTimesheet.date,
            location: updatedTimesheet.location,
            startTime: updatedTimesheet.startTime,
            endTime: updatedTimesheet.endTime,
            unpaidBreakDuration: updatedTimesheet.unpaidBreakDuration,
            totalHours: updatedTimesheet.totalHours,
            totalPaidJours: updatedTimesheet.totalPaidHours,
            rateMultiplier: updatedTimesheet.rateMultiplier,
            totalMiles: updatedTimesheet.totalMiles
          }
        } else {
          return timesheet
        }
      })
    })

    setTimesheetFormOpen(null)
    setTimesheetToEdit(null)
  }

  return (
    <div className="app">
      <header>
        <div className="heading-main">
          <div className="heading-logo">
            <FontAwesomeIcon icon={faHelmetSafety} />
          </div>
          <div className="heading-text">
            <h2>Subcontractor Hub</h2>
            <p>Timesheets & Invoicing</p>
          </div>
          <button>
            <FontAwesomeIcon icon={faGear}/>
          </button>
        </div>
        <div className="heading-tab-buttons">
          <button>
            Timesheets
          </button>
          <button>
            Invoices
          </button>
        </div>
      </header>
      <main className="app-main">
        <div className="main-heading">
          <div className="main-heading-text">
            <h1>My Timesheets</h1>
            <p>Manage your recorded workdays</p>
          </div>
          <button
            onClick={timesheetFormOpen === null 
              ? () => {
                setTimesheetFormOpen(true)
                setTimesheetToEdit(null)
              }
              : () => {
                setTimesheetFormOpen(null)
                setTimesheetToEdit(null)
              }}
            className={timesheetFormOpen === null ? "add-timesheet-button" : "close-timesheet-button"}
          >
            {timesheetFormOpen === null ? <FontAwesomeIcon icon={faPlus}/> : <FontAwesomeIcon icon={faMinus}/>}
            {timesheetFormOpen === null ? "Add timesheet" : "Cancel"}
          </button>
        </div>
        {timesheetFormOpen !== null && (
          <TimesheetForm
        onAddTimesheet={addTimesheetEntry}
        timesheetToEdit={timesheetToEdit !== null ? timesheetToEdit : "new"}
        onUpdateTimesheet={updateTimesheetEntry}
        />
        )}
        <div className="timesheets-container">
          {timesheets}
        </div>
      </main>
    </div>
  )
}

export default App

// next task: implementing timesheet deletion and persistence.