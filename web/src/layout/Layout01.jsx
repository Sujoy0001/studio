import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout01() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopHeader />
            <Header />
            <main className="flex-grow container mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}