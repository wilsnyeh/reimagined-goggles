import "./App.css"; 
import pawvector from './assets/paw-print-vector-icon.jpg'
import { handleMoreInfoClick } from './MoreInfoButton.jsx'

export default function AnimalTableData({ searchContent, moreInfo, setMoreInfo, token}) {
  
  // {!token ? <h1>grab a token</h1>  : null}
  return (
    <>
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
                <tr key={i}>
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
                  </tr>
                  {/*this is where you want to render the animaldetails*/}
                  {moreInfo ? 
                  <tr key={i}>
                  <td>{x.organization}</td>
                  {!x.orgAnimalId ? <td>❌</td> : <td>{x.orgAnimalId}</td>}
                  <td>{x.email}</td>
                </tr> : 
                // null
                <button onClick={handleMoreInfoClick}> more info </button> 
                }
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
