// import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import fetchData from "./fetch";
import fetch from "./fetch";
function File() {
  const { pathname } = useLocation();
  
 const {data}= fetchData()
 
 

  return (
    <>
    helo
      {/* {data} */}
     <button onClick={e=> console.log(data)}></button>
    </>
  );
}

export default File;
