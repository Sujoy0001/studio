import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loading"; // ✅ import the loader

export default function Layout01() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />} {/* ✅ show loader */}
      {!loading && (
        <div className="min-h-screen flex flex-col">
          <TopHeader />
          <Header />
          <main className="flex-grow container mx-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
