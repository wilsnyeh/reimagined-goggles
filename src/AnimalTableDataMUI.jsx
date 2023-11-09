import "./App.css";
import pawvector from "./assets/paw-print-vector-icon.jpg";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ModalDialog from "@mui/joy/ModalDialog";
import Button from "@mui/material/Button";
import ReactLoading from "react-loading";
import { BsHeart, BsHeartFill } from "react-icons/bs";


export default function AnimalTableDataMUI({
  searchContent,
  setSelectedAnimalDetail,
  selectedAnimalDetail,
  setIsModalOpen,
  isModalOpen,
  isLoading,
  nothing,
  isLoved,
  setIsLoved,

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

  // const handleAnimalDelete = (id) => {
  //   const newList = searchContent.filter((listitem, index) => index !== id);
  //   setSearchContent(newList);
  // };

  const handleAnimalPick = (id) => {
    setIsLoved((animals) => {
      if (animals[id]) {
        const newAnimals = { ...animals };
        delete newAnimals[id];
        return newAnimals
      } else {
        return {...animals, [id]: true}
      }
    })
  };

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

  const modalCols = [
    {
      field: "organization",
      headerName: "Organization",
      width: 125,
      editable: false,
    },
    {
      field: "contactEmail",
      headerName: "Contact Email",
      width: 350,
      editable: false,
    },
    {
      field: "contactPhone",
      headerName: "Contact Phone",
      width: 150,
      editable: false,
    },
    { field: "animalId", headerName: "Animal ID", width: 150, editable: false },
  ];

  const modalRows =
    selectedAnimalDetail &&
    selectedAnimalDetail.map((x, i) => {
      return {
        id: i,
        organization: `${x.organization ? `${x.organization}` : "N/A"}`,
        contactEmail: `${x.email ? `${x.email}` : "N/A"}`,
        contactPhone: `${x.phone ? `${x.phone}` : "N/A"}`,
        animalId: `${x.orgAnimalId ? `${x.orgAnimalId}` : "N/A"}`,
      };
    });

  const rows =
    searchContent &&
    searchContent.map((x, i) => {
      return {
        id: i,
        animalName: `${x.name}`,
        type: `${x.type}`,
        animalBreed: `${x.breed} ${x.breed2 ? `${x.breed2}` : ""}`,
        animalLocation: `${x.city} ${x.state}`,
        photos: `${x.photo}`,
      };
    });

  const columns = [
    {
      field: "animalName",
      headerName: "Animal Name",
      width: 150,
      editable: true,
    },
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
              height="150"
              alt="vector of a pawprint"
            />
          );
        }
        return (
          <img
            src={params.value}
            width="relative"
            height="150"
            alt="some real animals"
          />
        );
      },
    },
    {
      field: "animalDetails",
      headerName: "Animal Details",
      width: 125,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleRowClick(params.row.id)}
          >
            Details
          </Button>
        );
      },
    },
    {
      field: "pickMe",
      headerName: "Pick Me!",
      sortable: false,
      width: 125,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleAnimalPick(params.row.id)}
          >
            {isLoved
            ?  <BsHeartFill style={{color:'red', fontSize:"24px"}}/>
            : <BsHeart style={{color:'red', fontSize:'24px'}}/>
            }
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {nothing ? (
        isLoading ? (
          <div className="loading-mod">
            <ReactLoading type="spinningBubbles" color="#D36605" />
          </div>
        ) : null
      ) : (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            rowHeight={150}
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
      )}
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
                      className="modal-img"
                      src={selectedAnimalDetail[0]["photo"]}
                      width="relative"
                      height="300"
                      alt="some real animals"
                    />
                  )}
                  <DataGrid
                    rows={modalRows}
                    columns={modalCols}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 1 } },
                    }}
                    pageSizeOptions={[1]}
                  />
                </div>
              </Box>
            </>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
