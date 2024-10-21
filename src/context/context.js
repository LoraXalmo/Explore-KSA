import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

export let DataContext = createContext();

export default function DataContextFunction({ children }) {
  const [user, setUser] = useState(null); // User data
  const [destinations, setDestinations] = useState([]); // List of destinations
  const [accommodationPlaces, setAccommodationPlaces] = useState([]); // Places options
  const [accommodationTypes, setAccommodationTypes] = useState([]); // Types options
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Selected accommodation
  const [loading, setLoading] = useState(false); // Loading indicator
  const token = localStorage.getItem("token"); // Get the token from localStorage (stored as 'token')

  // Fetch user data, destinations, places, and types
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.id;

          const response = await axios.get(`https://explore-ksa-backend.vercel.app/apis/user/users/${userId}`);
          setUser(response.data); // Set user data
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null); // Clear user data on error
        }
      } else {
        setUser(null);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await axios.get("https://explore-ksa-backend.vercel.app/api/destinations");
        setDestinations(response.data); // Set destinations
      } catch (error) {
        console.error("Error fetching destinations", error);
        setDestinations([]); // Clear destinations on error
      }
    };

    const fetchAccommodationOptions = async () => {
      try {
        const [placesResponse, typesResponse] = await Promise.all([
          axios.get("https://explore-ksa-backend.vercel.app/api/accommodation/accommodations/names"),
          axios.get("https://explore-ksa-backend.vercel.app/api/accommodation/accommodations/types")
        ]);

        setAccommodationPlaces(placesResponse.data); // Set places options
        setAccommodationTypes(typesResponse.data); // Set types options
      } catch (error) {
        console.error("Error fetching accommodation options", error);
        setAccommodationPlaces([]);
        setAccommodationTypes([]);
      }
    };

    setUser(null);
    setDestinations([]);
    fetchUserData();
    fetchDestinations();
    fetchAccommodationOptions();
  }, [token]);

  // Fetch selected accommodation details
  const fetchAccommodationData = async (place, type) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://explore-ksa-backend.vercel.app/api/accommodation/getdata?name=${place}&type=${type}`);
      setSelectedAccommodation(response.data[0]);
    } catch (error) {
      console.error("Error fetching accommodation data", error);
      setSelectedAccommodation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        destinations,
        accommodationPlaces,
        accommodationTypes,
        selectedAccommodation,
        fetchAccommodationData,
        loading
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
