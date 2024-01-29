import React from "react";
import Navbar from "../components/navbar";
import JobPostingList from "../components/JobPostingList";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <JobPostingList />
      <Footer />
    </div>
  );
};

export default Home;
