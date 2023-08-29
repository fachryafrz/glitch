import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./sections/Footer";
import Copyright from "./sections/Copyright";
import Search from "./pages/Search";
import Navbar from "./sections/Navbar";
import Details from "./pages/Details";
import { useState } from "react";

export default function App() {
  const [error, setError] = useState(false);

  return (
    <Router>
      {error && (
        <div
          className={`fixed inset-0 bg-black flex flex-col justify-center items-center gap-4 z-[100]`}
        >
          <Link
            to={`/`}
            className={`flex items-center justify-center lg:justify-start gap-4 max-w-fit mx-auto lg:mx-0`}
          >
            <figure
              style={{ background: `url(/logo.svg)` }}
              className={`aspect-square w-[40px]`}
            ></figure>
            <span
              className={`after:content-['GameCove'] after:text-2xl after:font-bold`}
            ></span>
          </Link>
          Sorry we have reached our limit.
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      <main className={`min-h-[100dvh] md:container mx-auto px-4 xl:px-36`}>
        <h1 className={`sr-only`}>GameCove</h1>
        <Routes>
          <Route
            path={`/`}
            element={<Home error={error} setError={setError} />}
          />
          <Route
            path={`/games/:slug`}
            element={<Details error={error} setError={setError} />}
          />
          <Route
            path={`/search`}
            element={<Search error={error} setError={setError} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Copyright */}
      <Copyright />
    </Router>
  );
}
