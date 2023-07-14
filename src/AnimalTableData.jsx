import "./App.css"; 
import pawvector from './assets/paw-print-vector-icon.jpg'
import ReactModal from "react-modal";
// import { handleMoreInfoClick } from './MoreInfoButton.jsx'

export default function AnimalTableData({ searchContent, moreInfo, setMoreInfo, token, setSelectedAnimalDetail,selectedAnimalDetail,  setIsModalOpen, isModalOpen }) {
  
  const handleRowClick = (detail) => {
    setSelectedAnimalDetail(detail);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
    <div className='table-container'>
      <table className="table-center">
        <thead>
          <tr>
            <th>Animal Name</th>
            <th>Type</th>
            <th>Animal Breed</th>
            <th>Animal Location</th>
            <th>Photos</th>
            </tr>
            {/* {moreInfo ? 
            <tr>
            <th>Organization Id</th>
            <th>Animal Organization Id</th>
            <th>Organization Email</th>
            </tr>
            : null} */}
        </thead>
        <tbody>
          {searchContent &&
            searchContent.map((x, i) => {
              return (
                <>
                <tr key={i} onClick={() => handleRowClick(x)}>
                  <td>{x.name}</td>
                  <td>{x.type}</td>
                  <td>
                    {x.breed} {x.breed2}
                  </td>
                  <td>
                    {x.city} {x.state}
                  </td>
                  {!x.photo ? (
                      <td>
                      <img
                        src={pawvector}
                        width="100"
                        height="100"
                        alt="not available2"
                      />
                    </td>
                  ) : (
                      <td>
                        <img
                          src={x.photo}
                          width="100"
                          height="relative"
                          alt="not available"
                        />
                      </td>
                  )}
                  </tr>
                  {/*this is where you want to render the animaldetails*/}
                  {/* {moreInfo ? 
                  <tr key={i}>
                  <td>{x.organization}</td>
                  {!x.orgAnimalId ? <td>❌</td> : <td>{x.orgAnimalId}</td>}
                  <td>{x.email}</td>
                </tr> : 
                <button onClick={handleMoreInfoClick}> more info </button> 
                } */}
                </>
              );
            })}
        </tbody>
      </table>
      </div>
      <ReactModal isOpen={isModalOpen} onRequestClose={handleCloseModal} ariaHideApp={false} className='Modal-Content' overlayClassName='Modal-Portal'>
        {selectedAnimalDetail &&  (
          <>
          <div>
          {!selectedAnimalDetail.photo ? 
                      <img className='modal-img'
                        src={pawvector}
                        width="200"
                        height="200"
                        alt="not available2"
                      /> :
          <img className='modal-img' src={selectedAnimalDetail.photo} width="relative" height="200" alt='hero'/>}
          <h1 className='modal-text'><strong>{selectedAnimalDetail.name}</strong></h1>
          <table className="modal-table">
            <thead>
              <tr>
              <th>Organization</th>
              <th>Contact Email</th>
              <th>Animal ID</th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedAnimalDetail}>
              <td>{selectedAnimalDetail.organization}</td>
              {!selectedAnimalDetail.email ? <td>❌</td> : <td>{selectedAnimalDetail.email}</td>}
              {!selectedAnimalDetail.orgAnimalId ? <td>❌</td> : <td>{selectedAnimalDetail.orgAnimalId}</td>}
              </tr>
            </tbody>
          </table>
          </div>
          </>
        )}
        <button className='Modal-Close' onClick={handleCloseModal}>❌</button>
      </ReactModal>
    </>
  );
}
