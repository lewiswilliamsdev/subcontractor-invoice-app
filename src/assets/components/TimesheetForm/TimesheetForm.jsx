import './TimesheetForm.css'

import { useState } from 'react'

function TimesheetForm(props) {
    const initialTimesheetFormData = {
    date: "",
    location: "",
    startTime: "",
    endTime: "",
    unpaidBreakDuration: "",
    totalHours: "",
    entryMethod: "automatic",
    rateMultiplier: "1"
    }

    const [timesheetFormData, setTimesheetFormData] = useState(initialTimesheetFormData)

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddTimesheet(timesheetFormData)
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label htmlFor="date-input">Date</label>
            <input 
                id='date-input'
                type="date"
                value={timesheetFormData.date}
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        date: event.target.value
                    }))
                }}
            />
            
            <label htmlFor="location-input">Location</label>
            <input 
                id='location-input'
                type="text"
                value={timesheetFormData.location}
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        location: event.target.value
                    }))
                }}
            />

            <label htmlFor="start-time-input">Start Time</label>
            <input
                id='start-time-input'
                type="time" 
                value={timesheetFormData.startTime}
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        startTime: event.target.value
                    }))
                }}
            />

            <label htmlFor="end-time-input">End Time</label>
            <input 
                id='end-time-input'
                type="time"
                value={timesheetFormData.endTime}
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        endTime: event.target.value
                    }))
                }}
            />

            <label htmlFor="break-duration-input">Unpaid Break Duration In Minutes</label>
            <input 
                id='break-duration-input'
                type="number"
                value={timesheetFormData.unpaidBreakDuration}
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        unpaidBreakDuration: event.target.value
                    }))
                }}
            />

            <label htmlFor="rate-multiplier-input">Hourly Rate Mulitplier</label>
            <input 
                id='rate-multiplier-input'
                type="number"
                value={timesheetFormData.rateMultiplier}
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        rateMultiplier: event.target.value
                    }))
                }}
            />

            <div className="entry-method-buttons">
                <button
                    onClick={() => {
                        setTimesheetFormData(previousData => ({
                            ...previousData,
                            entryMethod: "automatic"
                        }))
                    }}
                >
                    Automatic Hours Caluclation
                </button>
                
                <button
                    onClick={() => {
                        setTimesheetFormData(previousData => ({
                            ...previousData,
                            entryMethod: "manual"
                        }))
                    }}
                >
                    Manual Hours Entry
                </button>
            </div>

            <label htmlFor="total-hours">Total Hours</label>
            {timesheetFormData.entryMethod === "automatic" && (
                <p>{timesheetFormData.totalHours}</p>
            )}
            {timesheetFormData.entryMethod === "manual" && (
                <input
                    id='total-hours'
                    type='number'
                    value={timesheetFormData.totalHours}
                    onChange={(event) => {
                        setTimesheetFormData(previousData => ({
                            ...previousData,
                            totalHours: event.target.value
                        }))
                    }}
                />
            )}

            <button
                type='submit'
            >
                Submit
            </button>
        </form>
    )
}

export default TimesheetForm