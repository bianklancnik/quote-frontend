import { useEffect, useState } from "react";
import { QuoteType } from "../../interfaces/QuoteType";
import AlternativeButton from "../common/AlternativeButton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import QuoteCard from "./QuoteCard";

const MostRecent = () => {
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

    fetch(`http://localhost:5000/myquote/most-recent?limit=${limit}`, {
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
      {isLoggedIn && (
        <>
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
            <div onClick={addPage}>
              <AlternativeButton text="Load more" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MostRecent;
