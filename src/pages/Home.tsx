import { useState } from "react";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import AddQuote from "../components/quotes/AddQuote";
import MostLiked from "../components/quotes/MostLiked";
import MostRecent from "../components/quotes/MostRecent";
import RandomQuote from "../components/quotes/RandomQuote";
import { QuoteType } from "../interfaces/QuoteType";

const Home = () => {
  const quoteAdd = (quote: QuoteType) => {
    // const newUser = quotes.map((user) => {
    //   if (user.id === JSON.parse(localStorage.getItem("id") || "")) {
    //     const firstName = user.firstName;
    //     const lastName = user.lastName;
    //     const id = user.id;
    //     const quotes = [...user.quotes, quote];
    //     return { id, firstName, lastName, quotes };
    //   }
    //   return user;
    // });
    // setQuotes(newUser);
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
        <RandomQuote />
        <MostLiked />
        <MostRecent />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
