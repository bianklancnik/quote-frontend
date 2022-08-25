import { useEffect, useState } from "react";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import useWindowDimensions from "../components/hooks/useWindowDimensions";
import AddQuote from "../components/quotes/AddQuote";
import DeleteQuote from "../components/quotes/DeleteQuote";
import EditQuote from "../components/quotes/EditQuote";
import QuoteCard from "../components/quotes/QuoteCard";
import { QuoteType } from "../interfaces/QuoteType";
import { UserType } from "../interfaces/UserType";

const Profile = () => {
  const { width } = useWindowDimensions();
  const mobile = width! <= 768;
  const [seen, setSeen] = useState<boolean>(false);
  const [seenEdit, setSeenEdit] = useState<boolean>(false);
  const [seenDelete, setSeenDelete] = useState<boolean>(false);
  const [quoteToDeleteId, setQuoteToDeleteID] = useState<string>("");
  const [quoteToEdit, setQuoteToEdit] = useState<QuoteType>();
  const [user, setUser] = useState<UserType>();
  const [userMostLikedQuotes, setUserMostLikedQuotes] = useState<QuoteType[]>();
  const [userMostRecentQuotes, setUserMostRecentQuotes] =
    useState<QuoteType[]>();
  const [userLikedQuotes, setUserLikedQuotes] = useState<QuoteType[]>();
  const [karma, setKarma] = useState<number>();
  const [userQuotesCount, setUserQuotesCount] = useState<number>();
  const [pages, setPages] = useState<number>(1);

  const toggleSeen = () => {
    setSeen(!seen);
  };

  const addPage = () => {
    setPages(pages + 1);
  };

  const onQuoteEdit = (quote: QuoteType) => {
    setQuoteToEdit(quote);
    return toggleSeenEdit();
  };

  const toggleSeenEdit = () => {
    setSeenEdit(!seenEdit);
  };

  const onQuoteDelete = (quoteId: string) => {
    setQuoteToDeleteID(quoteId);
    return toggleSeenDelete();
  };

  const toggleSeenDelete = () => {
    setSeenDelete(!seenDelete);
  };

  const showUserMostLikedQuotes = () => {
    if (userMostLikedQuotes) {
      return userMostLikedQuotes.map((quote) => {
        return (
          <QuoteCard
            key={quote.id}
            quote={quote}
            firstName={user?.firstName}
            lastName={user?.lastName}
            deleteQuote={onQuoteDelete}
            editQuote={onQuoteEdit}
            onVote={calculateKarma}
          />
        );
      });
    }
  };

  const showUserMostRecentQuotes = () => {
    if (userMostRecentQuotes) {
      return userMostRecentQuotes.map((quote) => {
        return (
          <QuoteCard
            key={quote.id}
            quote={quote}
            firstName={user?.firstName}
            lastName={user?.lastName}
            deleteQuote={onQuoteDelete}
            editQuote={onQuoteEdit}
            onVote={calculateKarma}
          />
        );
      });
    }
  };

  const showQuotesLikedByUser = () => {
    if (userLikedQuotes) {
      return userLikedQuotes.map((quote) => {
        return (
          <QuoteCard key={quote.id} quote={quote} onVote={calculateKarma} />
        );
      });
    }
  };

  const getUserInformation = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    fetch("http://localhost:5000/user/me", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { id, firstName, lastName, count } = response;
        setUser({ id, firstName, lastName });
        setUserQuotesCount(count);
      });
  };

  const getUserMostLikedQuotes = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    let limit;
    if (mobile) {
      limit = pages * 4;
    } else {
      limit = pages * 9;
    }

    fetch(`http://localhost:5000/myquote/user/most-liked?limit=${limit}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const quotes = response.map((quote: QuoteType) => quote);
        setUserMostLikedQuotes(quotes);
        const karma = quotes.reduce(
          (sum: number, quote: QuoteType) => sum + quote.votes.length,
          0
        );
        setKarma(karma);
      });
  };

  const getUserMostRecentQuotes = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    let limit;
    if (mobile) {
      limit = pages * 4;
    } else {
      limit = pages * 9;
    }

    fetch(`http://localhost:5000/myquote/user/most-recent?limit=${limit}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const quotes = response.map((quote: QuoteType) => quote);
        setUserMostRecentQuotes(quotes);
      });
  };

  const getQuotesLikedByUser = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    let limit;
    if (mobile) {
      limit = pages * 4;
    } else {
      limit = pages * 9;
    }

    fetch(`http://localhost:5000/myquote/user/liked?limit=${limit}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
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
        setUserLikedQuotes(newQuotes);
      });
  };

  const calculateKarma = (upvote: boolean) => {
    console.log(upvote);
    if (karma) {
      if (upvote) setKarma(karma + 1);
      else setKarma(karma - 1);
    }
  };

  const quoteDeleted = (quoteId: string) => {
    const mostLiked = userMostLikedQuotes?.filter(
      (quote) => quote.id !== quoteId
    );
    const mostRecent = userMostRecentQuotes?.filter(
      (quote) => quote.id !== quoteId
    );
    const liked = userLikedQuotes?.filter((quote) => quote.id !== quoteId);
    setUserMostLikedQuotes(mostLiked);
    setUserMostRecentQuotes(mostRecent);
    setUserLikedQuotes(liked);
  };

  const quoteEdit = (quoteId: string, desc: string) => {
    const mostLiked = userMostLikedQuotes?.map((quote) => {
      if (quote.id === quoteId) {
        quote.desc = desc;
        return quote;
      }
      return quote;
    });
    const mostRecent = userMostRecentQuotes?.map((quote) => {
      if (quote.id === quoteId) {
        quote.desc = desc;
        return quote;
      }
      return quote;
    });
    const liked = userLikedQuotes?.map((quote) => {
      if (quote.id === quoteId) {
        quote.desc = desc;
        return quote;
      }
      return quote;
    });
    setUserMostLikedQuotes(mostLiked);
    setUserMostRecentQuotes(mostRecent);
    setUserLikedQuotes(liked);
  };

  useEffect(() => {
    getUserInformation();
    getUserMostLikedQuotes();
    getUserMostRecentQuotes();
    getQuotesLikedByUser();
  }, []);

  useEffect(() => {
    getUserMostLikedQuotes();
    getUserMostRecentQuotes();
    getQuotesLikedByUser();
  }, [pages]);

  return (
    <div className="body">
      <NavBar toggleSeen={toggleSeen} orange={true} />
      {seen ? <AddQuote toggle={toggleSeen} /> : null}
      {seenEdit ? (
        <EditQuote
          toggle={toggleSeenEdit}
          onQuoteEdit={quoteEdit}
          quote={quoteToEdit}
        />
      ) : null}
      {seenDelete ? (
        <DeleteQuote
          toggle={toggleSeenDelete}
          onQuoteDelete={quoteDeleted}
          quoteId={quoteToDeleteId}
        />
      ) : null}
      <div
        className={`landing-page wrap ${seen && "blur"} ${seenEdit && "blur"} ${
          seenDelete && "blur"
        }`}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="box-row full profile-name">
          <img
            src="favicon.ico"
            alt=""
            style={{
              marginBottom: "1%",
              width: "50px",
              height: "50px",
              filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))",
              borderRadius: "50%",
            }}
          />
          <div className="font-white h4">{`${user?.firstName} ${user?.lastName}`}</div>
          <div className="box-row quote-karma">
            <div>
              <div>Quotes</div>
              <div className="h5 font-orange">
                {userQuotesCount ? userQuotesCount : 0}
              </div>
            </div>
            <div>
              <div>Quote karma</div>
              <div className="h5">{karma}</div>
            </div>
          </div>
        </div>
        <div className="box-row quotes-profile">
          <div>
            <div className="font-orange h5" style={{ marginTop: "5%" }}>
              Most liked quotes
            </div>
            {showUserMostLikedQuotes()}
          </div>
          <div>
            <div className="h5" style={{ marginTop: "5%" }}>
              Most recent
            </div>
            {showUserMostRecentQuotes()}
          </div>
          <div>
            <div className="h5" style={{ marginTop: "5%" }}>
              Liked
            </div>
            {showQuotesLikedByUser()}
          </div>
        </div>
        <div
          className="box-row full center-align padding-five"
          onClick={addPage}
        >
          <AlternativeButton text="Load more" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
