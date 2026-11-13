    import './TimesheetForm.css'

    import { useState } from 'react'

    const initialTimesheetFormData = {
            date: "",
            location: "",
            startTime: "",
            endTime: "",
            unpaidBreakDuration: "0",
            totalPaidHours: "",
            rateMultiplier: "1",
            totalMiles: "0"
        }

    const initialErrorData = {
            date: "",
            location: "",
            startTime: "",
            endTime: "",
            timeError: "",
            unpaidBreakDuration: "",
            totalHours: "",
            totalPaidHours: "",
            totalMiles: ""
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

            const totalMinutes = (endTimeTotalMinutes - startTimeTotalMinutes)

            const totalCalculatedMinutes = totalMinutes - breakMinutes;

            const totalHours = totalCalculatedMinutes / 60;

            return {
                totalMinutes: totalMinutes,
                totalCalculatedHours: totalHours
            };
        }

        const calculatedHoursObject = calculateTotalHours();

        let totalHours = null

        let totalMinutes = null

        if (calculatedHoursObject !== null) {
            totalHours = calculatedHoursObject.totalCalculatedHours;
            totalMinutes = calculatedHoursObject.totalMinutes
        }   

        function handleSubmit(event) {
            event.preventDefault();

            const submittedErrorData = {
                date: "",
                location: "",
                startTime: "",
                endTime: "",
                timeError: "",
                unpaidBreakDuration: "",
                totalHours: "",
                totalPaidHours: "",
                totalMiles: ""
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

            if (totalMinutes <= 0) {
                submittedErrorData.timeError = "Your start or end time are invalid"
            }

            if (totalMinutes > 0 && 
                timesheetFormData.unpaidBreakDuration >= totalMinutes) {
                submittedErrorData.unpaidBreakDuration = "Your break duration is longer than your total shift"
            }

            if (timesheetFormData.unpaidBreakDuration < 0 
                || timesheetFormData.unpaidBreakDuration === "") {
                submittedErrorData.unpaidBreakDuration = "Your break duration is invalid"
            }

            if (timesheetFormData.totalPaidHours !== "" && 
                timesheetFormData.totalPaidHours <= 0) {
                    submittedErrorData.totalPaidHours = "Total paid hours must be greater than zero"
                }

            if (timesheetFormData.totalMiles < 0 || 
                timesheetFormData.totalMiles === ""
            ) {
                submittedErrorData.totalMiles = "Your total miles are invalid"
            }

            setErrorData(submittedErrorData)

            const errorCheck = Object.values(submittedErrorData).some(data => data !== "") 

            if (errorCheck === true) {
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
                rateMultiplier: Number(timesheetFormData.rateMultiplier),
                totalMiles: Number(timesheetFormData.totalMiles)
            }

            props.onAddTimesheet(updatedTimeSheet);

            setTimesheetFormData(initialTimesheetFormData);
            setErrorData(initialErrorData);
        }

        return (
            <form
                onSubmit={handleSubmit}
            >
                <div className="form-header">
                    <h2>Add Timesheet</h2>
                    <p>Record your working hours and mileage</p>
                </div>

                <div className="form-grid">
                    <div className="form-field">
                        <label htmlFor="date-input">Date</label>
                        <input 
                            id='date-input'
                            className={errorData.date !== "" ? "invalid date-input" : "date-input"}
                            type="date"
                            value={timesheetFormData.date}
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    date: event.target.value
                                }))
                            }}
                        />

                        {errorData.date !== "" ? 
                        <p className='error-message'>{errorData.date}</p> 
                        : null}
                    </div>
                
                    <div className="form-field">
                        <label htmlFor="location-input">Location</label>
                        <input 
                            id='location-input'
                            className={errorData.location !== "" ? "invalid location-input" : "location-input"}
                            type="text"
                            value={timesheetFormData.location}
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    location: event.target.value
                                }))
                            }}
                        />
    
                        {errorData.location !== "" ? 
                        <p className='error-message'>{errorData.location}</p> 
                        : null}
                    </div>
    
                    <div className="form-field">
                        <label htmlFor="start-time-input">Start Time</label>
                        <input
                            id='start-time-input'
                            className={errorData.startTime !== "" || errorData.timeError !== "" 
                                ? "invalid start-time-input" : "start-time-input"}
                            type="time" 
                            value={timesheetFormData.startTime}
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    startTime: event.target.value
                                }))
                            }}
                        />
        
                        {errorData.startTime !== "" ? 
                        <p className='error-message'>{errorData.startTime}</p> 
                        : null}
                    </div>
    
                    <div className="form-field">
                        <label htmlFor="end-time-input">End Time</label>
                        <input 
                            id='end-time-input'
                            className={errorData.endTime !== "" || errorData.timeError !== "" 
                                ? "invalid end-time-input" : "end-time-input"}
                            type="time"
                            value={timesheetFormData.endTime}
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    endTime: event.target.value
                                }))
                            }}
                        />
        
                        {errorData.endTime !== "" ? 
                        <p className='error-message'>{errorData.endTime}</p> 
                        : null}
        
                        {errorData.timeError !== "" ?
                        <p className='error-message'>{errorData.timeError}</p> 
                        : null
                        }
                    </div>
    
                    <div className="form-field">
                        <label htmlFor="break-duration-input">Unpaid Break Duration In Minutes</label>
                        <input 
                            id='break-duration-input'
                            className={errorData.unpaidBreakDuration !== "" 
                                ? "invalid unpaid-break-duration-input"
                                : "unpaid-break-duration-input"
                            }
                            type="number"
                            value={timesheetFormData.unpaidBreakDuration}
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    unpaidBreakDuration: event.target.value
                                }))
                            }}
                        />
                        
                        {errorData.unpaidBreakDuration !== "" ? 
                        <p className='error-message'>{errorData.unpaidBreakDuration}</p> 
                        : null}
                    </div>
    
                    <div className="form-field form-field-full">
                        <div className="calculatedHours">
                            <div className="total-hours-container">
                                <p>Total Hours :</p>
                                <p>
                                    {totalHours !== null ? totalHours.toFixed(2) : null}
                                </p>
                            </div>
                        </div>
                    </div>
    
                    <div className="form-field">
                        <label htmlFor="total-paid-hours-input">Total Paid Hours</label>
                        <input 
                            id='total-paid-hours-input'
                            className={errorData.totalPaidHours !== "" 
                                ? "invalid total-paid-hours-input"
                                : "total-paid-hours-input"
                            }
                            type="number"
                            value={timesheetFormData.totalPaidHours} 
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    totalPaidHours: event.target.value
                                }))
                            }}
                        />
        
                        {errorData.totalPaidHours !== "" ? 
                        <p className='error-message'>{errorData.totalPaidHours}</p> 
                        : null}
                    </div>
    
                    <div className="form-field">
                        <label htmlFor="rate-multiplier-select">Hourly Rate Mulitplier</label>
                        <select 
                            name="rate-multiplier-select" 
                            id="rate-multiplier-select"
                            className='rate-multiplier-select'
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
                    </div>
    
                    <div className="form-field">
                        <label htmlFor="total-miles-input">Total Miles</label>
                        <input 
                            id='total-miles-input'
                            className={errorData.totalMiles !== "" 
                                ? "invalid total-miles-input"
                                : "total-miles-input"
                            }
                            type="number"
                            value={timesheetFormData.totalMiles}
                            onChange={(event) => {
                                setTimesheetFormData(previousData => ({
                                    ...previousData,
                                    totalMiles: event.target.value
                                }))
                            }}
                        />
        
                        {errorData.totalMiles !== "" ? 
                        <p className='error-message'>{errorData.totalMiles}</p> 
                        : null}
                    </div>
            </div>

                <button
                    type='submit'
                    className='submit-timesheet-button'
                >
                    Save Timesheet
                </button>
            </form>
        )
    }

    export default TimesheetForm