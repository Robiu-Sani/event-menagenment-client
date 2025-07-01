import { createContext, useState } from "react";

export const ContextData = createContext();
export default function Context({ children }) {
  const [isSetupWork, setIsSetUpWork] = useState("hellow world");
  const [eventSearchItem, setEventSearchItem] = useState({});
  const [userData, setUserData] = useState({});

  const testing = (data) => {
    setIsSetUpWork(data);
  };

  const handleUserData = (data) => {
    setUserData(data);
  };

  const handleEventSearchItem = (data) => {
    setEventSearchItem(data);
  };

  const contextData = {
    testing,
    isSetupWork,
    handleUserData,
    userData,
    handleEventSearchItem,
    eventSearchItem,
  };

  return (
    <ContextData.Provider value={contextData}>{children}</ContextData.Provider>
  );
}
