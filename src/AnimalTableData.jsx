import "./App.css"; 
import pawvector from './assets/paw-print-vector-icon.jpg'

export default function AnimalTableData({ searchContent}) {
  return (
    <>
      <table className="table-center">
        <thead>
          <tr>
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
            searchContent.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.name}</td>
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
                    <>
                      <td>
                        <img
                          src={x.photo}
                          width="100"
                          height="100"
                          alt="not available"
                        />
                      </td>
                    </>
                  )}

                  <td>{x.organization}</td>
                  {!x.orgAnimalId ? <td>❌</td> : <td>{x.orgAnimalId}</td>}
                  <td>{x.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
