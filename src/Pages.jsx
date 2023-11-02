import React, { useEffect } from "react";

const Pages = ({
    page, 
    setPage, 
    totalPages, 
    submitted,  
    fetchAnimalData,
    selectedBreedType,
    setSelectedBreedType,
    setBreedList,
    searchType
}) => 
{
    useEffect(() => {
        //this was causing error for its initial render
        //needed something to delay the first render
        if (!submitted) {
          return;
        }
        fetchAnimalData()
      },[page])

      useEffect(() => {
        if (!submitted) {
          return;
        }
        setPage(1);
        // setSelectedBreedType("")
        fetchAnimalData()
      },[selectedBreedType])

      useEffect(() => {
        if (!submitted) {
          return;
        }
        setPage(1);
        setSelectedBreedType("")
        setBreedList([])
        // fetchAnimalData()
      },[searchType])

    return (
        <div>
        {submitted && (
              <>
              <p>Page {page} of {totalPages}</p>
                <button
                  className="arrow-buttons"
                  onClick={() => {
                    setPage(page > 1 ? page - 1 : 1);
                  }}
                >
                  &lt;&lt;
                </button>{" "}
                <button
                  className="arrow-buttons"
                  onClick={() => {
                    setPage(page < totalPages ? page + 1 : totalPages);
                  }}
                >
                  &gt;&gt;
                </button>
              </>
            )}
        </div>
    )
}

export default Pages;s