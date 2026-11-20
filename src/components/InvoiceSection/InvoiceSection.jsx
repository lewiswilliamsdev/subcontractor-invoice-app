import './InvoiceSection.css'

function InvoiceSection() {
    return (
        <div className="invoice-section">
            <h1>My invoices</h1>
            <button 
                className='create-invoice-button'
            >
                Create new invoice
            </button>
        </div>
    )
}

export default InvoiceSection