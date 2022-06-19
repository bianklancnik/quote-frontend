import React from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import PrimaryButton from "../components/common/PrimaryButton";
import QuoteCard from "../components/common/QuoteCard";

const Home = () => {
  return (
    <div className="body">
      <NavBar />
      <div className="landing-page wrap">
        <div className="box-row half left-text padding-five">
          <div className="h1">
            Welcome to <span className="font-orange">Quotastic</span>
          </div>
          <div className="h5">
            Quotastic is free online platform for you to explore the quips,
            quotes, and proverbs. Sign up and express yourself.
          </div>
          <Link to="/signup" className="link">
            <PrimaryButton text="Sign up" />
          </Link>
        </div>
        <div className="box-row half center-align">
          <QuoteCard />
        </div>
        <div className="box-row full h2 padding-five">
          <div className="width">
            Explore the world of{" "}
            <span className="font-orange">fantastic quotes</span>
          </div>
        </div>
        <div className="box-column full center-align">
          <div className="h4 font-orange">Most upvoted quotes</div>
          <div className="width">
            Most upvoted quotes on the platform. Sign up or login to like the
            quotes and keep them saved in your profile
          </div>
        </div>
        <div className="box-row full quote-grid">
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
          <div className="quote-grid-card">
            <QuoteCard />
          </div>
        </div>
        <div className="box-row full center-align padding-ten">
          <Link to="/signup" className="link">
            <AlternativeButton text="Sign up for more" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
