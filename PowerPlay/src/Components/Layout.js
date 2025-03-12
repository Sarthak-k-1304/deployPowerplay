import { Outlet } from "react-router";
import { Header } from "./Header/Header";

export function Layout() {
  console.log("Layoutrender");
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
