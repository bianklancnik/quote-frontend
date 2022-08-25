import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuoteType } from "../../interfaces/QuoteType";
import PrimaryButton from "../common/PrimaryButton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import QuoteCard from "./QuoteCard";

const RandomQuote = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const { width } = useWindowDimensions();
  const mobile = width! <= 768;

  const [randomQuote, setRandomQuote] = useState<QuoteType>();

  const getRandomQuote = () => {
    fetch("http://localhost:5000/myquote/random-quote", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { id, desc, user, votes } = response;
        const { firstName, lastName } = user;
        const uid = user.id;
        setRandomQuote({ id, desc, uid, firstName, lastName, votes });
      });
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const showRandomQuote = () => {
    if (randomQuote)
      return <QuoteCard key={randomQuote.id} quote={randomQuote} />;
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <div className="half left-text padding-five">
            <div className="landing-title">
              Welcome to{" "}
              <span className="font-orange landing-title">Quotastic</span>
            </div>
            <div className="h5">
              Quotastic is free online platform for you to explore the quips,
              quotes, and proverbs. Sign up and express yourself.
            </div>
            <Link to="/signup" className="link">
              <PrimaryButton text="Sign up" />
            </Link>
          </div>
          <div
            className={`box-row center-align quote-grid-card ${
              !mobile && "half"
            }`}
            style={{ margin: "auto" }}
          >
            {showRandomQuote()}
          </div>
          <div className="box-row full padding-five">
            <div className="width landing-title-h2">
              Explore the world of{" "}
              <span className="font-orange landing-title-h2">
                fantastic quotes
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="full" style={{ padding: "5%" }}>
          <div className="box-column full center-align">
            <div className="landing-title-h4 font-orange">Quote of the day</div>
            <div className="width">
              Quote of the day is randomly choosen quote.
            </div>
          </div>
          <div className="box-row full quote-grid">{showRandomQuote()}</div>
        </div>
      )}
    </>
  );
};

export default RandomQuote;
