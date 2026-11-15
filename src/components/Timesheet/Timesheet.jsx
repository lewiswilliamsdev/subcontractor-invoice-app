import './Timesheet.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Timesheet(props) {
    function getDate() {
        const date = new Date(props.timesheet.date);

        return date.toLocaleDateString("en-GB", {
            weekday: "long",
            month: "long",
            day: "numeric",
            timeZone: "UTC"
        })
    }

    return (
        <div className="timesheet-container">
            <div className="timesheet-heading">
                <div className="timesheet-heading-info">
                    <h2>{getDate()}</h2>
                    <div className="timesheet-heading-location">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>{props.timesheet.location}</p>
                    </div>
                </div>
                <div className="timesheet-heading-status">
                    <p>Recorded</p>
                </div>
            </div>

            <div className="timesheet-main">
                <div className="timesheet-shift-times">
                    <div className="start-time">
                        <h3>Start</h3>
                        <p>{props.timesheet.startTime}</p>
                    </div>
                    <div className="end-time">
                        <h3>Finish</h3>
                        <p>{props.timesheet.endTime}</p>
                    </div>
                    <div className="break-duration">
                        <h3>Unpaid break</h3>
                        <p>{props.timesheet.unpaidBreakDuration} min</p>
                    </div>
                </div>

                <div className="timesheet-shift-hours">
                    <div className="hours-worked">
                        <p>Hours worked</p>
                        <p>{props.timesheet.totalHours} hours</p>
                    </div>
                    <div className="paid-hours">
                        <p>Paid hours</p>
                        <p>{props.timesheet.totalPaidHours} hours</p>
                    </div>
                </div>

                <div className="timesheet-additional-info">
                    <div className="rate-multiplier">
                        <p>Rate multiplier</p>
                        <p>{props.timesheet.rateMultiplier}x</p>
                    </div>
                    <div className="mileage">
                        <p>mileage</p>
                        <p>{props.timesheet.totalMiles} Miles</p>
                    </div>
                </div>
            </div>

            <div className="timesheet-buttons">
                <button 
                    className='edit-button'
                    onClick={() => props.onEdit(props.timesheet)}
                    >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <p>Edit</p>
                </button>
                <button 
                    className='delete-button'
                    onClick={() => props.onDelete(props.timesheet.id)}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                    <p>Delete</p>
                </button>
            </div>
        </div>
    )
}

export default Timesheet