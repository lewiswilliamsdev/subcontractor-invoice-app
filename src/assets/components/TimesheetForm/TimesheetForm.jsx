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

    const initialErrorData = {
            date: "",
            location: "",
            startTime: "",
            endTime: "",
            unpaidBreakDuration: "",
            totalPaidHours: "",
            }

    function TimesheetForm(props) {

        const [timesheetFormData, setTimesheetFormData] = useState(initialTimesheetFormData)

        const [errorData, setErrorData] = useState(initialErrorData)

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

        function handleSubmit(event) {
            event.preventDefault();

            setErrorData(initialErrorData)

            const submittedErrorData = {
                date: "",
                location: "",
                startTime: "",
                endTime: "",
                unpaidBreakDuration: "",
                totalHours: "",
                totalPaidHours: "",
            }

            if (!timesheetFormData.date) {
                submittedErrorData.date = "Please provide a date"
            }

            if (!timesheetFormData.location.trim()) {
                submittedErrorData.location = "Please provide location"
            }

            if (!timesheetFormData.startTime) {
                submittedErrorData.startTime = "Please provide a valid start time"
            }

            if (!timesheetFormData.endTime) {
                submittedErrorData.endTime = "Please provide a valid end time"
            }

            if (timesheetFormData.unpaidBreakDuration < 0 
                || timesheetFormData.unpaidBreakDuration === "") {
                submittedErrorData.unpaidBreakDuration = "Your break duration is invalid"
            }

            if (totalHours <= 0) {
                submittedErrorData.totalHours = "Invalid working hours. Please check your start time, finish time and unpaid break duration"
            } 

            if (timesheetFormData.totalPaidHours !== "" && 
                timesheetFormData.totalPaidHours <= 0) {
                    submittedErrorData.totalPaidHours = "Total paid hours must be greater than zero"
                }

            setErrorData(submittedErrorData)

            const errorCheck = Object.values(errorData).some(errorData === initialErrorData)

            if (errorCheck !== true) {
                return;
            }
    
            let updatedPaidHours

            if (timesheetFormData.totalPaidHours === "") {
                updatedPaidHours = totalHours
            } else {
                updatedPaidHours = Number(timesheetFormData.totalPaidHours)
            }

            const updatedTimeSheet = {
                date: timesheetFormData.date,
                location: timesheetFormData.location.trim(),
                startTime: timesheetFormData.startTime,
                endTime: timesheetFormData.endTime,
                unpaidBreakDuration: Number(timesheetFormData.unpaidBreakDuration),
                totalHours: totalHours,
                totalPaidHours: Number(updatedPaidHours),
                rateMultiplier: Number(timesheetFormData.rateMultiplier)
            }

            props.onAddTimesheet(updatedTimeSheet);

            setTimesheetFormData(initialTimesheetFormData);
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

                <p 
                    id='total-hours'>
                        Total Hours: 
                        {totalHours !== null ? totalHours.toFixed(2) : null}
                </p>   

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

                <label htmlFor="rate-multiplier-select">Hourly Rate Mulitplier</label>
                <select 
                    name="rate-multiplier-select" 
                    id="rate-multiplier-select"
                    value={timesheetFormData.rateMultiplier}
                    onChange={(event) => {
                        setTimesheetFormData(previousData => ({
                            ...previousData,
                            rateMultiplier: event.target.value
                        }))
                    }}
                    >
                        <option value="1">1</option>
                        <option value="1.25">1.25</option>
                        <option value="1.5">1.5</option>
                        <option value="1.75">1.75</option>
                        <option value="2">2</option>
                        <option value="2.25">2.25</option>
                        <option value="2.5">2.5</option>
                        <option value="2.75">2.75</option>
                        <option value="3">3</option>
                </select>

                <button
                    type='submit'
                >
                    Submit
                </button>
            </form>
        )
    }

    export default TimesheetForm