import { useContext } from "react";
import { ContextData } from "../default/Context";

export default function useContextData() {
  const {
    handleEventSearchItem,
    eventSearchItem,
    handleUserData,
    userData,
    handleHomeEvents,
    homeEvents,
  } = useContext(ContextData);
  return {
    handleEventSearchItem,
    eventSearchItem,
    handleUserData,
    userData,
    handleHomeEvents,
    homeEvents,
  };
}
