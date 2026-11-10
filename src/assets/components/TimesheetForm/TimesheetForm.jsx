import './TimesheetForm.css'

import { useState } from 'react'

const initialTimesheetFormData = {
    date: "",
    location: "",
    startTime: "",
    endTime: "",
    unpaidBreakDuration: "0",
    totalPaidHours: "",
    rateMultiplier: "1"
    }

function TimesheetForm(props) {

    const [timesheetFormData, setTimesheetFormData] = useState(initialTimesheetFormData)

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddTimesheet(timesheetFormData);
    }

    function calculateTotalHours() {
        if (
            timesheetFormData.startTime === "" || timesheetFormData.endTime === ""
        ) {
            return null;
        }

        const startTime = timesheetFormData.startTime.split(":");
        
        const startTimeHours = Number(startTime[0]);
        const startTimeMinutes = Number(startTime[1]);

        const startTimeTotalMinutes = (startTimeHours * 60) + startTimeMinutes;


        const endTime = timesheetFormData.endTime.split(":");

        const endTimeHours = Number(endTime[0]);
        const endTimeMinutes = Number(endTime[1]);

        const endTimeTotalMinutes = (endTimeHours * 60) + endTimeMinutes;

        const breakMinutes = Number(timesheetFormData.unpaidBreakDuration);

        const totalMinutes = (endTimeTotalMinutes - startTimeTotalMinutes) - breakMinutes;

        const totalHours = totalMinutes / 60;

        return totalHours;
    }

    const totalHours = calculateTotalHours();

    let calculatedTotalHours = null

    if (totalHours !== null) {
        calculatedTotalHours = Number(totalHours.toFixed(2))
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

            <p id='total-hours'>Total Hours: {calculatedTotalHours}</p>

            <label htmlFor="total-paid-hours-input">Total Paid Hours</label>
            <input 
                id='total-paid-hours-input'
                type="number"
                value={timesheetFormData.totalPaidHours} 
                onChange={(event) => {
                    setTimesheetFormData(previousData => ({
                        ...previousData,
                        totalPaidHours: event.target.value
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

            <button
                type='submit'
            >
                Submit
            </button>
        </form>
    )
}

export default TimesheetForm