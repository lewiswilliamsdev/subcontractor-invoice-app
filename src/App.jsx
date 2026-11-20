import './App.css'

import { useState, useEffect } from 'react'

import TimesheetForm from './components/TimesheetForm/TimesheetForm'
import Timesheet from './components/Timesheet/Timesheet'
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation'
import InvoiceSection from './components/InvoiceSection/InvoiceSection' 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHelmetSafety,
  faGear,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const savedTimesheets = localStorage.getItem("timesheetEntries")

  let initialTimesheets;

  if (savedTimesheets === null) {
    initialTimesheets = []
  } else {
    const parsedTimesheets = JSON.parse(savedTimesheets)

    initialTimesheets = parsedTimesheets
  }

  const [timesheetEntries, setTimesheetEntries] = useState(initialTimesheets)

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

  const [timesheetPendingDeletion, setTimesheetPendingDeletion] = useState(null)

  const timesheets = timesheetEntries.map(function(timesheet) {
    return <Timesheet
      key={timesheet.id}
      timesheet={timesheet}
      className= "timesheet-card"
      onEdit={editTimeSheet}
      onDelete={setTimesheetPendingDeletion}
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
            totalPaidHours: updatedTimesheet.totalPaidHours,
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

  function deleteTimesheet(timesheetId) {
    const updatedTimesheets = timesheetEntries.filter(function(timesheet) {
      return timesheet.id !== timesheetId
    })

    setTimesheetEntries(updatedTimesheets)
  }

  useEffect(() => {
    localStorage.setItem("timesheetEntries", JSON.stringify(timesheetEntries))
  }, [timesheetEntries])

  console.log(savedTimesheets)

  const [invoiceSectionOpen, setInvoiceSectionOpen] = useState(false)

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
          <button
            onClick={() => setInvoiceSectionOpen(false)}
          >
            Timesheets
          </button>
          <button
            onClick={() => setInvoiceSectionOpen(true)}
          >
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
        {invoiceSectionOpen === false &&
          <div className="timesheets-container">
            {timesheets}
          </div>
          }
        {timesheetPendingDeletion !== null && 
          < DeleteConfirmation 
            onCancel={() => setTimesheetPendingDeletion(null)}
            onConfirmDelete={() => {
              deleteTimesheet(timesheetPendingDeletion)
              setTimesheetPendingDeletion(null)
            }
            }
          />
        }
        {invoiceSectionOpen === true &&
          <div className="invoice-section">
            <InvoiceSection/>
          </div>
          }

      </main>
    </div>
  )
}

export default App