import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { userData, loading, error, refetch: fetchData };
}
