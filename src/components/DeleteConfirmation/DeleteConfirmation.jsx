import './DeleteConfirmation.css'

function DeleteConfirmation(props) {
    return (
        <div className="delete-confirmation-message">
            <p>
                Are you sure you want to delete this timesheet?
            </p>
            <button
                className='cancel-button'
                onClick={props.onCancel}
            >
                Cancel
            </button>
            <button
                className='confirm-delete-button'
                onClick={props.onConfirmDelete}
            >
                Confirm Delete
            </button>
        </div>
    )
}

export default DeleteConfirmation