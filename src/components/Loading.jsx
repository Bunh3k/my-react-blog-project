import { IoReload } from "react-icons/io5";

export default function Loading(){
    return(
        <div className="loading">
            <IoReload className="spinner"/>
            <p>Loading...</p>
        </div>
    )
}