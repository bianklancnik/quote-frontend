import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuoteType } from "../../interfaces/QuoteType";
import AlternativeButton from "../common/AlternativeButton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import QuoteCard from "./QuoteCard";

const MostLiked = () => {
  const { width } = useWindowDimensions();
  const mobile = width! <= 768;
  const isLoggedIn = localStorage.getItem("accessToken");
  const [pages, setPages] = useState<number>(1);
  const [quotes, setQuotes] = useState<QuoteType[]>([]);

  const getQuotes = () => {
    let limit;
    if (mobile) {
      limit = pages * 4;
    } else {
      limit = pages * 9;
    }

    fetch(`${process.env.REACT_APP_URL}/myquote/most-liked?limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const newQuotes = response.map((quote: any) => {
          const { id, desc, user, votes } = quote;
          const { firstName, lastName } = user;
          const uid = user.id;
          return { id, desc, uid, firstName, lastName, votes };
        });
        setQuotes(newQuotes);
      });
  };

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    getQuotes();
  }, [pages]);

  const addPage = () => {
    setPages(pages + 1);
  };

  const showQuotes = () => {
    return quotes.map((quote) => {
      return <QuoteCard key={quote.id} quote={quote} />;
    });
  };

  return (
    <>
      <div className="box-column full center-align">
        <div className="landing-title-h4 font-orange">Most liked quotes</div>
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
          <div onClick={addPage}>
            <AlternativeButton text="Load more" />
          </div>
        </div>
      ) : (
        <div className="box-row full center-align padding-five">
          <Link to="/signup" className="link">
            <AlternativeButton text="Sign up for more" />
          </Link>
        </div>
      )}
    </>
  );
};

export default MostLiked;
