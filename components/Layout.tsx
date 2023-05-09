import { useState } from "react";
import { SideBar } from "./SideBar";

import { Header } from "./Header";
import { Loader } from "./Loader";
import { Router } from "next/router";

interface IAdminLayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: IAdminLayout) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <div>
      <SideBar open={open} />
      <div
        className={`min-h-screen bg-dark-gray text-off-white ${
          !open ? "ml-16" : "ml-60"
        } duration-300`}
      >
        <Header open={open} setOpen={setOpen} />
        <div className="relative min-h-[calc(100vh_-_73px)]">
          {loading && <Loader />}
          <div className="mt-5 px-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
