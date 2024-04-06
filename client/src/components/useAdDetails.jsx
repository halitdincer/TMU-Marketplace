import axios from "axios"; // Custom hook to fetch and manage ad details.
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Custom hook to fetch and manage ad details.
 * @returns {Object} An object containing the ad details.
 */
function useAdDetails() {
  const { id: adId } = useParams();
  const [ad, setAd] = useState({});

  useEffect(() => {
    // Fetches the ad details from the API.
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ads/${adId}/`);
        setAd(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (adId) {
      fetchAdDetails();
    }
  }, [adId]);

  return {
    ad
  };
}

export default useAdDetails;
