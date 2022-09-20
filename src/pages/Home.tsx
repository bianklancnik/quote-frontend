import { useState } from "react";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import AddQuote from "../components/quotes/AddQuote";
import MostLiked from "../components/quotes/MostLiked";
import MostRecent from "../components/quotes/MostRecent";
import RandomQuote from "../components/quotes/RandomQuote";

const Home = () => {
  const [seen, setSeen] = useState<boolean>(false);

  const toggleSeen = () => {
    setSeen(!seen);
  };

  return (
    <div className="body">
      <NavBar toggleSeen={toggleSeen} />
      {seen ? <AddQuote toggle={toggleSeen} /> : null}
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
