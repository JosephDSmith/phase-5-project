import ButterflyCard from "./ButterflyCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ButterflyContainer({butterflies, user, fetchButterflies}) {
    const navigate = useNavigate()

    useEffect(() => {
        fetchButterflies();
    }, [])
    
    if (!user){
        navigate('/authentication')
    } else {
        return (
            <div className="butterfly-collection">
                <h1>Butterfly Community Collection</h1>
                <div className="butterfly-container">
                    {butterflies.map(butterfly => <ButterflyCard  key={butterfly.id} butterfly={butterfly}  />)}
                </div>
            </div>
           )
    }     
    
  }
  export default ButterflyContainer;