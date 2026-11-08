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
    entryMethod: "automatic"
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
            <button
                type='submit'
            >
                Submit
            </button>
        </form>
    )
}

export default TimesheetForm