import "./App.css"; 
import pawvector from './assets/paw-print-vector-icon.jpg';
import ReactModal from "react-modal";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import React from "react";


export default function AnimalTableDataMUI({ searchContent, setSelectedAnimalDetail,selectedAnimalDetail,  setIsModalOpen, isModalOpen }) {
  
  const handleRowClick = (detail) => {
    setSelectedAnimalDetail(detail);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }


  // ID needs to be dynamic for rows
  // columns also need to be dynamic to handle the api fetch data
  const rows = 
    // searchContent && 
    searchContent && searchContent.map((x, i) => {
      return (
        {id: i , animalName: `${x.name}`, type: `${x.type}`, animalBreed: `${x.breed} ?${x.breed2}`, animalLocation: `${x.city} ${x.state}`, 
        
        photos: `${x.photo}`
        // `${!x.photo ? (
        //   <img 
        //   src={pawvector}
        //   width='100'
        //   height='100'
        //   alt='not available2'/>
        // ) :
        // (
        //   <img
        //   src={x.photo}
        //   width='100'
        //   height='relative'
        //   alt='some picture' />
        // )}`
      })
    })
    // { id: 1, animalName: 'Hello', type: 'World', animalBreed: 'something else', animalLocation: 'some', photos: 'thing'}, 
  ;


  const columns = [
    { field: 'animalName', headerName: 'Animal Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'animalBreed', headerName: 'Animal Breed', width: 150 },
    { field: 'animalLocation', headerName: 'Animal Location', width: 150 },
    { field: 'photos', headerName: 'Photos', width: 150 },
  ];
  return (
    <>

<div style={{ height: 300, width: '100%' }}>
      <DataGrid 
      rows={rows}

      columns={columns} />
    </div>
    {/* <div className='table-container'>
      <table className="table-center">
        <thead>
          <tr>
            <th>Animal Name</th>
            <th>Type</th>
            <th>Animal Breed</th>
            <th>Animal Location</th>
            <th>Photos</th>
            </tr>
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
      </ReactModal> */}
    </>
  );
}
