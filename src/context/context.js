import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

export let DataContext = createContext();

export default function DataContextFunction({ children }) {
  const [user, setUser] = useState(null);  // User data
  const [destinations, setDestinations] = useState([]);  // List of destinations
  const token = localStorage.getItem('token'); // Get the token from localStorage (stored as 'token')

  // Fetch user data and destinations
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          // Decode the token to get the user ID
          const decodedToken = jwtDecode(token);
          console.log("decodedToken", decodedToken);
          
          const userId = decodedToken?.id;  // Assuming 'id' is the field in the token that stores the user ID

          // Fetch user data by ID
          const response = await axios.get(`https://explore-ksa-backend.vercel.app/apis/user/users/${userId}`);
          console.log('====================================');
          console.log('response', response);
          console.log('====================================');
          setUser(response.data);  // Set the user data in state
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null); // Clear user data on error
        }
      } else {
        setUser(null); // Clear user data if token is not present
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await axios.get("https://explore-ksa-backend.vercel.app/api/destinations");
        setDestinations(response.data);  // Set the destinations in state
      } catch (error) {
        console.error("Error fetching destinations", error);
        setDestinations([]); // Clear destinations on error
      }
    };

    // Clear user and destinations on token change
    setUser(null);
    setDestinations([]);
    
    // Fetch new data
    fetchUserData();
    fetchDestinations();
  }, [token]); // Re-run this effect when the token changes

  return (
    <DataContext.Provider
      value={{
        user,
        destinations
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
