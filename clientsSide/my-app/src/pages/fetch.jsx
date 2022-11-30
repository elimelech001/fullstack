import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function FetchData(url='', body={}) {
   const location =useLocation()
  const [data, SetData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, SetError] = useState([]);
  useEffect(() => {
    async function fetching() {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/${url}`, body);
        const contentType =await response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const responseData= await(response.json())
            SetData(responseData)
          }
         else {
            const responseData= await(response.text()) 
            SetData(responseData)
        }
       

        setIsLoading(false);
      } catch (error) {
        SetError(error.message);
        setIsLoading(false);
        console.log(error.message);
      }
    }
    fetching();
    
  }, [location]);

  return { data, loading, error };
}
