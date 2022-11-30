import { json } from "react-router-dom";
import FetchData from "./fetch";

function Info({path}) {

 const {data}=FetchData(path)
const j= JSON.stringify(data)

return (
   
     
      Object.keys(data).map((key, index) => {
        return (
          <div key={index}>
            <h6>
              {key}: {data[key]}
            </h6>

            <hr />
          </div>
        );
      })    
)
}

export default Info;