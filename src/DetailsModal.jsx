import ReactModal from "react-modal";

export function DetailsModal({isModalOpen, setIsModalOpen}) {
    function openModal() {
        setIsModalOpen(true)
        console.log(isModalOpen)
    }
    
    function closeModal() {
        setIsModalOpen(false)
    }
    return (
        <div>
            <button onClick={openModal}> open modal</button>
        </div>
    )
}