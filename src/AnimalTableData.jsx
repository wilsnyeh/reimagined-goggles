import "./App.css"; 
import pawvector from './assets/paw-print-vector-icon.jpg'
// import { handleMoreInfoClick } from './MoreInfoButton.jsx'
import ReactModal from "react-modal";

export default function AnimalTableData({ searchContent, moreInfo, setMoreInfo, token, setSelectedAnimalDetail,selectedAnimalDetail,  setIsModalOpen, isModalOpen }) {
  
  const handleRowClick = (detail) => {
    setSelectedAnimalDetail(detail);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  // {!token ? <h1>grab a token</h1>  : null}
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
            {moreInfo ? 
            <tr>
            <th>Organization Id</th>
            <th>Animal Organization Id</th>
            <th>Organization Email</th>
            </tr>
            : null}
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
      <ReactModal isOpen={isModalOpen} onRequestClose={handleCloseModal} className='Modal-Content' overlayClassName='Modal-Portal'>
        {selectedAnimalDetail && (
          <>
          {!selectedAnimalDetail.photo ? 
                      <img
                        src={pawvector}
                        width="200"
                        height="200"
                        alt="not available2"
                      /> :
          <img src={selectedAnimalDetail.photo} alt='hero'/>}
          <h1><strong>{selectedAnimalDetail.name}</strong></h1>
          <table>
            <thead>
              <tr>
              <th>Organization</th>
              <th>Contact Email</th>
              <th>Animal ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>{selectedAnimalDetail.organization}</td>
              {!selectedAnimalDetail.email ? <td>❌</td> : <td>{selectedAnimalDetail.email}</td>}
              {!selectedAnimalDetail.orgAnimalId ? <td>❌</td> : <td>{selectedAnimalDetail.orgAnimalId}</td>}
              </tr>
            </tbody>
          </table>
          </>
        )}
        <button onClick={handleCloseModal}>close</button>
      </ReactModal>
    </>
  );
}
