import "./App.css";
import pawvector from "./assets/paw-print-vector-icon.jpg";
// import ReactModal from "react-modal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import FormLabel from '@mui/joy/FormLabel';
import ModalDialog from "@mui/joy/ModalDialog";
// import EditIcon from '@mui/icons-material/Edit';

export default function AnimalTableDataMUI({
  searchContent,
  setSearchContent,
  setSelectedAnimalDetail,
  selectedAnimalDetail,
  setIsModalOpen,
  isModalOpen,
  newName, 
  setNewName
}) {
  const handleRowClick = (detail) => {
    const animalDeets = searchContent.filter(
      (listitem, index) => index === detail
    );
    setSelectedAnimalDetail(animalDeets);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAnimalDelete = (id) => {
    const newList = searchContent.filter((listitem, index) => index !== id);
    setSearchContent(newList);
  };

  const handleAnimalNameChange = (e) => {
    e.preventDefault();
    const index = searchContent.findIndex(animal=> animal.name === selectedAnimalDetail[0]['name'])
    const newSearchContent = [...searchContent];
    newSearchContent[index] = {...newSearchContent[index], name: newName};
    setSearchContent(newSearchContent);
    setIsModalOpen(false);
  }

  // selectedAnimalDetail[0]['name']
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const rows =
    searchContent &&
    searchContent.map((x, i) => {
      return {
        id: i,
        animalName: `${x.name}`,
        type: `${x.type}`,
        animalBreed: `${x.breed} ${x.breed2}`,
        animalLocation: `${x.city} ${x.state}`,
        photos: `${x.photo}`,
      };
    });

  const columns = [
    { field: "animalName", headerName: "Animal Name", width: 150, editable: true},
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "animalBreed",
      headerName: "Animal Breed",
      width: 300,
      renderCell: (params) => {
        if (!params.value) {
          return "";
        }
      },
    },
    { field: "animalLocation", headerName: "Animal Location", width: 150 },
    {
      field: "photos",
      headerName: "Photos",
      width: 150,
      renderCell: (params) => {
        if (params.value === "null") {
          return (
            <img
              src={pawvector}
              width="relative"
              height="100"
              alt="vector of a paw"
            />
          );
        }
        return (
          <img
            src={params.value}
            width="relative"
            height="100"
            alt="some real animals"
          />
        );
      },
    },
    {
      field: "animalDetails",
      headerName: "Animal Details",
      width: 150,
      renderCell: (params) => {
        return (
          <button onClick={() => handleRowClick(params.row.id)}>Details</button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <button onClick={() => handleAnimalDelete(params.row.id)}>
            Delete
          </button>
        );
      },
    },
  ];


  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          rowHeight={100}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          columns={columns}
        />
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <ModalDialog variant="soft" sx={{ maxWidth: 500, maxHeight: 500 }}>
          {selectedAnimalDetail && (
            <>
              <Box sx={style}>
                <div className="modal-text">
                  <h1>{selectedAnimalDetail[0]["name"]}</h1>
                  <img
                    src={selectedAnimalDetail[0]["photo"]}
                    width="relative"
                    height="100"
                    alt="some real animals"
                  />
                  <br></br>
                  <form
                    onSubmit={handleAnimalNameChange}
                  >
                    <Stack spacing={2}>
                      <FormControl>
                        <FormLabel>Name Changer</FormLabel>
                        <input value={newName}
                        onChange={(e)=> setNewName(e.target.value)}
                        placeholder='New Name'></input>
                      </FormControl>
                      <button type='submit'>Submit</button>
                    </Stack>
                  </form>
                </div>
              </Box>
            </>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}

//div here
{
  /* 
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
      </ReactModal> */
}
//     </>
//   );
// }
