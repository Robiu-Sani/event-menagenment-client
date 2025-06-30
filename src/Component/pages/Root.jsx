import { Outlet } from "react-router-dom";
import Footer from "../default/Footer";
import NavBar from "../default/NavBar";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
