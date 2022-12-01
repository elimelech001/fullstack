import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Info from "./info";
import fetchData from "./fetch";
function Folder({ deleteFile, setOnInput, submitRename }) {
  const nav = useNavigate();
  const [info, setInfo] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [rename, setRename] = useState(false);
  const { pathname } = useLocation();
  const { data } = fetchData(pathname);
  function typeFile(name) {
    return name.includes('.')
  }

  if (typeof data == "string") return data;
  return (
    <>
      {data.map((e) => {
        return (
          <div className="border">
            <h2>{e.name}</h2>
            <button  onClick={(event) => setInfo(`${pathname.slice(1)}/${e.name}/info`)+setShowInfo(!showInfo)}>info</button>
            <button>
              {" "}
              <Link to={`${pathname.slice(1)}/${e.name}`}>enter</Link>
            </button>
            <button onClick={(e) => setRename(!rename)}>rename</button>
            {typeFile(e.name) && (
              <button onClick={(e) => setRename(!rename)}>copy</button>
            )}
            <button
              onClick={(event) => deleteFile(`${pathname.slice(1)}/${e.name}`)}
            >
              delete
            </button>{" "}
            <br />
           
            {rename && (
              <>
                name:
                <input
                  type="text"
                  onChange={(e) => setOnInput(e.target.value)}
                />
                <button
                  onClick={(event) =>
                    submitRename(`${pathname.slice(1)}/${e.name}`, "PUT")
                  }
                >
                  submit
                </button>{" "}
              </>
            )}
            {rename && (
              <>
                copy name:
                <input
                  type="text"
                  onChange={(e) => setOnInput(e.target.value)}
                />
                <button
                  onClick={(event) =>
                    submitRename(`${pathname.slice(1)}/${e.name}`, "POST")
                  }
                >
                  submit
                </button>{" "}
              </>
            )}
          </div>
        );
      })}
<br /><br /><br /><br />
    
 {showInfo&&<> <h2>info</h2>  <Info path={info}/></>}    </>
  );
}

export default Folder;

// const deleteFolder = async () => {
//   const urls =`http://localhost:5000/${pathname}`
//   const url = pathname.split("/");
//   url.pop();
//   try {
//     const res = await fetch(url, {
//       method: "DELETE",
//     });
//     if (res.status == 204) return nav(url.join("/"));

//   } catch (error) {
//     console.log(error);
//   }

// };
