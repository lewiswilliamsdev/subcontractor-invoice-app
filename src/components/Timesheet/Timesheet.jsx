import './Timesheet.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Timesheet(props) {
    function getDate() {
        const date = props.timesheet.date;

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
                        <p>{props.timesheet.totalHours}</p>
                    </div>
                    <div className="paid-hours">
                        <p>Paid hours</p>
                        <p>{props.timesheet.totalPaidHours}</p>
                    </div>
                </div>

                <div className="timesheet-additional-info">
                    <div className="rate-multiplier">
                        <p>Rate multiplier</p>
                        <p>{props.timesheet.rateMultiplier}</p>
                    </div>
                    <div className="mileage">
                        <p>mileage</p>
                        <p>{props.timesheet.totalMiles}</p>
                    </div>
                </div>
            </div>

            <div className="timesheet-buttons">
                <div className="edit-button">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <p>Edit</p>
                </div>
                <div className="delete-button">
                    <FontAwesomeIcon icon={faTrash} />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default Timesheet