import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import PrimaryButton from "../components/common/PrimaryButton";
import QuoteCard from "../components/quotes/QuoteCard";
import { UserType } from "../interfaces/UserType";
import { QuoteType } from "../interfaces/QuoteType";
import AddQuote from "../components/quotes/AddQuote";
import useWindowDimensions from "../components/hooks/useWindowDimensions";

const Home = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const { width } = useWindowDimensions();
  const mobile = width! <= 768;

  const getQuotes = () => {
    fetch("http://localhost:5000/auth/list", {
      headers: {
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

  const quoteAdd = (quote: QuoteType) => {
    const newUser = quotes.map((user) => {
      if (user.id === JSON.parse(localStorage.getItem("id") || "")) {
        const firstName = user.firstName;
        const lastName = user.lastName;
        const id = user.id;
        const quotes = [...user.quotes, quote];
        return { id, firstName, lastName, quotes };
      }
      return user;
    });
    setQuotes(newUser);
  };

  const [seen, setSeen] = useState<boolean>(false);

  const toggleSeen = () => {
    setSeen(!seen);
  };

  return (
    <div className="body">
      <NavBar toggleSeen={toggleSeen} />
      {seen ? <AddQuote toggle={toggleSeen} onQuoteAdd={quoteAdd} /> : null}
      <div className={`landing-page wrap ${seen && "blur"}`}>
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
              <div className="landing-title-h4 font-orange">
                Quote of the day
              </div>
              <div className="width">
                Quote of the day is randomly choosen quote.
              </div>
            </div>
            <div className="box-row full quote-grid">{showRandomQuote()}</div>
          </div>
        )}
        <div className="box-column full center-align">
          <div className="landing-title-h4 font-orange">
            Most upvoted quotes
          </div>
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
              <div className="landing-title-h4 font-orange">
                Most recent quotes
              </div>
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
