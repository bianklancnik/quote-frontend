import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import AddQuote from "../components/quotes/AddQuote";
import DeleteQuote from "../components/quotes/DeleteQuote";
import EditQuote from "../components/quotes/EditQuote";
import ProfileQuoteCard from "../components/quotes/ProfileQuoteCard";
import { QuoteType } from "../interfaces/QuoteType";
import { UserType } from "../interfaces/UserType";

const Profile = () => {
  const [seen, setSeen] = useState<boolean>(false);
  const [seenEdit, setSeenEdit] = useState<boolean>(false);
  const [seenDelete, setSeenDelete] = useState<boolean>(false);
  const [quoteToDeleteId, setQuoteToDeleteID] = useState<string>("");
  const [quoteToEdit, setQuoteToEdit] = useState<QuoteType>();
  const [user, setUser] = useState<UserType>();

  const toggleSeen = () => {
    setSeen(!seen);
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

  const showUserQuotes = () => {
    return user?.quotes.map((quote) => {
      return (
        <ProfileQuoteCard
          key={quote.id}
          quote={quote}
          firstName={user.firstName}
          lastName={user.lastName}
          deleteQuote={onQuoteDelete}
          editQuote={onQuoteEdit}
        />
      );
    });
  };

  const quoteDeleted = (quoteId: string) => {
    const quotes = user!.quotes.filter((quote) => quote.id !== quoteId);
    const firstName = user!.firstName;
    const lastName = user!.lastName;
    const id = user!.id;
    const newUser = { id, firstName, lastName, quotes };
    setUser(newUser);
  };

  const getUserInformation = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    fetch("http://localhost:5000/auth/me", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { id, firstName, lastName, quotes } = response;
        setUser({ id, firstName, lastName, quotes });
      });
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  const quoteAdd = (quote: QuoteType) => {
    const firstName = user!.firstName;
    const lastName = user!.lastName;
    const id = user!.id;
    const quotes = [...user!.quotes, quote];
    const updatedUser = { id, firstName, lastName, quotes };
    setUser(updatedUser);
  };

  const quoteEdit = (quote: QuoteType) => {
    const firstName = user!.firstName;
    const lastName = user!.lastName;
    const id = user!.id;
    const quotes = user!.quotes.map((q) => {
      if (q.id === quote.id) return quote;
      return q;
    });
    const updatedUser = { id, firstName, lastName, quotes };
    setUser(updatedUser);
  };

  const calculateQuoteKarma = () => {
    const karma = user?.quotes.reduce((sum, quote) => sum + quote.upvotes, 0);
    return karma;
  };

  return (
    <div className="body">
      <NavBar toggleSeen={toggleSeen} orange={true} />
      {seen ? <AddQuote toggle={toggleSeen} onQuoteAdd={quoteAdd} /> : null}
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
              <div className="h5 font-orange">{user?.quotes.length}</div>
            </div>
            <div>
              <div>Quote karma</div>
              <div className="h5">{calculateQuoteKarma()}</div>
            </div>
          </div>
        </div>
        <div className="box-row quotes-profile">
          <div>
            <div className="font-orange h5" style={{ marginTop: "5%" }}>
              Most liked quotes
            </div>
            {showUserQuotes()}
          </div>
          <div>
            <div className="h5" style={{ marginTop: "5%" }}>
              Most recent
            </div>
            {showUserQuotes()}
          </div>
          <div>
            <div className="h5" style={{ marginTop: "5%" }}>
              Liked
            </div>
            {showUserQuotes()}
          </div>
        </div>
        <div className="box-row full center-align padding-five">
          <Link to="/" className="link">
            <AlternativeButton text="Load more" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
