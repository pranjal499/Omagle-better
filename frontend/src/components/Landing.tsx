import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing () {

    const navigate = useNavigate();
    const [name, setName] = useState("");

    function handleChange (event: any) {
        setName(event.target.value);
    }

    return (
        <div>
            <input type="text" onChange={handleChange}/>
            <button onClick={() => navigate(`/room?name=${name}`)}>submit</button>
        </div>
    )
}