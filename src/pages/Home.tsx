import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import PrimaryButton from "../components/common/PrimaryButton";
import QuoteCard from "../components/common/QuoteCard";
import { UserType } from "../interfaces/UserType";

const Home = () => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const getQuotes = () => {
    fetch("http://localhost:5000/auth/list", {
      headers: {
        //Authorization: "bearer " + this.props.authState.accessToken.value,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setQuotes(response);
      });
  };

  const getRandomQuote = () => {
    fetch("http://localhost:5000/auth/random-quote", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setRandomQuote(response);
      });
  };

  useEffect(() => {
    getQuotes();
    getRandomQuote();
  }, []);

  const [quotes, setQuotes] = useState<UserType[]>([]);
  const [randomQuote, setRandomQuote] = useState<UserType>();

  const showQuotes = () => {
    return quotes.map((user) => {
      let firstName = user.firstName;
      let lastName = user.lastName;
      return user.quotes.map((quote) => {
        return (
          <QuoteCard
            key={quote.id}
            quote={quote}
            firstName={firstName}
            lastName={lastName}
          />
        );
      });
    });
  };

  const showRandomQuote = () => {
    return randomQuote?.quotes.map((quote) => {
      return (
        <QuoteCard
          key={quote.id}
          quote={quote}
          firstName={randomQuote.firstName}
          lastName={randomQuote.lastName}
        />
      );
    });
  };

  return (
    <div className="body">
      <NavBar />
      <div className="landing-page wrap">
        {!isLoggedIn ? (
          <>
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

            <div className="box-row half center-align">{showRandomQuote()}</div>
            <div className="box-row full h2 padding-five">
              <div className="width">
                Explore the world of{" "}
                <span className="font-orange">fantastic quotes</span>
              </div>
            </div>
          </>
        ) : (
          <div className="full" style={{ padding: "5%" }}>
            <div className="box-column full center-align">
              <div className="h4 font-orange">Quote of the day</div>
              <div className="width">
                Quote of the day is randomly choosen quote.
              </div>
            </div>
            <div className="box-row full quote-grid">
              <div className="quote-grid-card">{showRandomQuote()}</div>
            </div>
          </div>
        )}
        <div className="box-column full center-align">
          <div className="h4 font-orange">Most upvoted quotes</div>
          <div className="width">
            Most upvoted quotes on the platform. Sign up or login to like the
            quotes and keep them saved in your profile
          </div>
        </div>
        <div className="box-row full quote-grid">
          <div className="quote-grid-card">{showQuotes()}</div>
        </div>
        {isLoggedIn ? (
          <div className="box-row full center-align padding-five">
            <Link to="/" className="link">
              <AlternativeButton text="Load more" />
            </Link>
          </div>
        ) : (
          <div className="box-row full center-align padding-five">
            <Link to="/signup" className="link">
              <AlternativeButton text="Sign up for more" />
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <>
            {" "}
            <div className="box-column full center-align">
              <div className="h4 font-orange">Most recent quotes</div>
              <div className="width">
                Recent quotes updates as soon user adds new quote. Go ahed show
                them that you seen the new quote and like the ones you like.
              </div>
            </div>
            <div className="box-row full quote-grid">
              <div className="quote-grid-card">{showQuotes()}</div>
            </div>
            <div className="box-row full center-align padding-five">
              <Link to="/" className="link">
                <AlternativeButton text="Load more" />
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
