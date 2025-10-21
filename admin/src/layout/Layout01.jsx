import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout01() {
    return (
        <div className="min-h-screen max-w-full p-0 flex flex-col bg-zinc-950 justify-between items-center">
          <Header />
          <Navbar />
            <main className="flex-1 container mx-auto">
              <Outlet />
            </main>
          <Footer />
        </div>
    )
}