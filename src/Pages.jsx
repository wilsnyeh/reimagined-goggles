import React from "react";


const Pages = ({
    page, 
    setPage, 
    totalPages, 
    submitted,
    isLoading,
}) => 
{
    return (
        <div>
        {submitted && !isLoading && (
              <>
              <p style={{fontSize: "16px"}} >Page {page} of {totalPages}</p>
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

export default Pages;