import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./sections/Footer";
import Copyright from "./sections/Copyright";
import Search from "./pages/Search";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      {/* <Navbar /> */}

      <main className={`min-h-screen`}>
        <h1 className={`sr-only`}>GameCove</h1>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/detail`} element={<h1>Detail</h1>} />
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
