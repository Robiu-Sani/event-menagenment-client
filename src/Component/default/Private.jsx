import { Navigate, useLocation } from "react-router-dom";
import useGetUserData from "./useGetUserData";

export default function Private({ children }) {
  const { userData, loading } = useGetUserData();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#e0dfdf] w-full min-h-[500px]">
        <span className="loading loading-spinner loading-[150px]"></span>
      </div>
    );
  }

  if (userData) {
    return children;
  }

  return (
    <Navigate state={location.pathname} to={`/login`} replace={true}></Navigate>
  );
}
