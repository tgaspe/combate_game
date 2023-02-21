import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./pages.css";
function Navbar() {
  return (
    <nav>
          <Link to="/">LOBBY</Link>
    </nav>
  );
}

export default Navbar;