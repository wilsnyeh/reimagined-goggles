import React from "react";

export default function AnimalTableData({searchContent}) {

    return (
        <table className="table-center">
        <thead>
          <tr key='key'>
            <th>Animal Name</th>
            <th>Animal Breed</th>
            <th>Animal Location</th>
            <th>Photos</th>
            <th>Organization Id</th>
            <th>Animal Organization Id</th>
            <th>Organization Email</th>
          </tr>
        </thead>
        <tbody>
          {searchContent &&
            searchContent.map((x) => {
              return (
                <tr>
                  <td>{x.name}</td>
                  <td>{x.breed} {x.breed2}</td>
                  <td>
                    {x.city} {x.state}
                  </td>
                  <td><img src={x.photo} width='100' height='100' alt="not available" /></td>
                  <td>{x.organization}</td>
                  <td>{x.orgAnimalId}</td>
                  <td>{x.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    )

}