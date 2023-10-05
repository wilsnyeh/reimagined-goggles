import "./App.css";
import pawvector from "./assets/paw-print-vector-icon.jpg";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import FormLabel from '@mui/joy/FormLabel';
import ModalDialog from "@mui/joy/ModalDialog";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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
    //declare index, as the searchcontent that matches our selection
    const index = searchContent.findIndex(animal=> animal.name === selectedAnimalDetail[0]['name'])
    //declare newsearchcontent with the rest of the data from search content
    const newSearchContent = [...searchContent];
    //designates specific searchcontent to be the newsearchcontent obj, and name, to be the state of newName
    newSearchContent[index] = {...newSearchContent[index], name: newName};
    //setting the new state of searchcontent
    setSearchContent(newSearchContent);
    setIsModalOpen(false);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
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
        animalBreed: `${x.breed} ${x.breed2 ? `${x.breed2}` : ""}` ,
        animalLocation: `${x.city} ${x.state}`,
        photos: `${x.photo}`,
      };
    });

  const modalCols = [
    { field: "organization", headerName: "Organization", width: 150, editable: false},
    { field: "contactEmail", headerName: "Contact Email", width: 150, editable: false},
    { field: "contactPhone", headerName: "Contact Phone", width: 150, editable: false}, 
    { field: "animalId", headerName: "Animal ID", width: 150, editable: false},
  ]

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
              alt="vector of a pawprint"
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
      width: 100,
      renderCell: (params) => {
        return (
          <Button variant="outlined" onClick={() => handleRowClick(params.row.id)}>Details</Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 125,
      renderCell: (params) => {
        return (
          <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={() => handleAnimalDelete(params.row.id)}>
            Delete
          </Button>
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
                  {!selectedAnimalDetail[0]["photo"] ? (
                    <img
                    className="modal-img"
                    src={pawvector}
                    width="200"
                    height="200"
                    alt="not available2"
                  />
                  ) : (
                  <img
                    src={selectedAnimalDetail[0]["photo"]}
                    width="relative"
                    height="100"
                    alt="some real animals"
                  />
                  )}
                  <table>
                    <thead>
                    <th>Organization</th>
                    <th>Contact Email</th>
                    <th>Contact Phone</th>
                    <th>Animal ID</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedAnimalDetail[0]["organization"]}</td>
                        <td>{selectedAnimalDetail[0]['email']}</td>
                        <td>{selectedAnimalDetail[0]['phone']}</td>
                        <td>{selectedAnimalDetail[0]['orgAnimalId']}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br></br>
                  <form
                    onSubmit={handleAnimalNameChange}
                  >
                    <Stack spacing={2}>
                      {/* <FormControl>
                        <FormLabel>Name Changer</FormLabel>
                        <input value={newName}
                        onChange={(e)=> setNewName(e.target.value)}
                        placeholder='New Name'></input>
                      </FormControl> */}
                      <Button variant="outlined" type='submit'>Submit</Button>
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
