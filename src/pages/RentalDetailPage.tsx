import { useParams } from "react-router-dom";

export function RenalDetailPage(){

    const { id } = useParams();
    const rentalId = Number(id);

    if (Number.isNaN(rentalId)) {
        return <p>Ungültige Verleih-ID</p>;
    }
    
    return(
        <div>
            <h1>Verleih Details</h1>
            <p>Hier folgt später die Detailseite zu einem Verleih</p>
        </div>
    )
}