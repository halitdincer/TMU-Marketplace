import axios from "axios";
import React, {useEffect, useState } from "react";
import { useParams} from "react-router-dom";

function useAdDetails(){
    const {id: adId } = useParams();
    const [ad, setAd] = useState({});
  
    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ads/${adId}/`);
            setAd(response.data);
          } catch (error) {
            console.log(error)
          }
        }
  
      if (adId) {
        fetchCategories();
      }
    }, [adId]);
  
    return {
      ad
    };
}

export default useAdDetails;

