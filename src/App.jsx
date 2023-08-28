import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./sections/Footer";
import Copyright from "./sections/Copyright";
import Search from "./pages/Search";
import Navbar from "./sections/Navbar";
import Details from "./pages/Details";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      <main className={`min-h-[100dvh] md:container mx-auto px-4 xl:px-36`}>
        <h1 className={`sr-only`}>GameCove</h1>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/games/:slug`} element={<Details />} />
          <Route path={`/search`} element={<Search />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Copyright */}
      <Copyright />
    </Router>
  );
}
