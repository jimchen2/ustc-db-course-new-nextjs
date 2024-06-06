import React from "react";
import Navbar from "../components/Navbar";
import "./globals.css";

const HomePage: React.FC = () => {
  return (
    <div>
      <main className="container">
        <h1>Welcome to the Home Page</h1>
        <p>
          This is the entry point of the application. Feel free to navigate
          through the different sections using the links above.
        </p>
      </main>
    </div>
  );
};

export default HomePage;
