import pawvector from './assets/paw-print-vector-icon.jpg'

export function AnimalDetails({searchContent, isModalOpen}) {
    
    return (
        <>
        {isModalOpen && (
            <table>
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Email</th>
                        <th>Animal's Id</th>
                    </tr>
                </thead>
                <tbody>
                    {searchContent && 
                    searchContent.map((x, i) => {
                        return (
                            <>
                            <tr key={i}>
                                <td>{x.organization}</td>
                                {!x.email ? <td>❌</td> : <td>{x.email}</td>}
                                {!x.orgAnimalId ? <td>❌</td> : <td>{x.orgAnimalId}</td>}
                                {!x.hero ? (<td><img src={pawvector} width='200' height='200' alt='n/a' /> </td>) : ( <td>
                                    <img src={x.hero} width='200' height='relative' alt='na' />
                                </td>

                                )}
                            </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        )}
        </>
    )
}