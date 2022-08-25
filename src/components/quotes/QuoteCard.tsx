import { QuoteType } from "../../interfaces/QuoteType";
import { IoSettingsOutline, IoCloseOutline } from "react-icons/io5";
import Upvote from "../common/Upvote";
import Downvote from "../common/Downvote";
import { useEffect, useState } from "react";

type QuoteCardType = {
  firstName?: string;
  lastName?: string;
  quote: QuoteType;
  deleteQuote?: any;
  editQuote?: any;
  onVote?: any;
};

const QuoteCard = ({
  firstName,
  lastName,
  quote,
  deleteQuote,
  editQuote,
  onVote,
}: QuoteCardType) => {
  const [upvote, setUpvote] = useState<boolean>(false);
  const [downvote, setDownvote] = useState<boolean>(false);
  const [karma, setKarma] = useState<number>();

  const Upvoted = () => {
    setUpvote(!upvote);
    let newKarma = karma;
    if (!upvote) setKarma(newKarma! + 1);
    if (downvote) {
      setKarma(newKarma! + 1);
      setDownvote(!downvote);
    }
    onVote(true);
  };

  const Downvoted = () => {
    setDownvote(!downvote);
    let newKarma = karma;
    if (!downvote) setKarma(newKarma! - 1);
    if (upvote) {
      setKarma(newKarma! - 1);
      setUpvote(!upvote);
    }
    onVote(false);
  };

  const calculateQuoteKarma = () => {
    if (!quote.votes) return 0;
    if (Array.isArray(quote.votes)) setKarma(quote.votes.length);
    else setKarma(1);
  };

  useEffect(() => {
    calculateQuoteKarma();
  }, []);

  return (
    <div className="card">
      <div className="voting">
        <Upvote voted={upvote} onUpvote={Upvoted} id={quote.id} />
        <div className="number">{karma ? karma : 0}</div>
        <Downvote voted={downvote} onDownvote={Downvoted} id={quote.id} />
      </div>
      <div className="quote">
        <div className="quote-text">{quote.desc}</div>
        <div className="quote-user">
          <img className="quote-user-profile-picture" alt="" />
          <div className="content">
            {firstName ? firstName : quote.firstName}{" "}
            {lastName ? lastName : quote.lastName}
          </div>
        </div>
      </div>
      {(deleteQuote || editQuote) && (
        <div className="voting">
          <IoSettingsOutline
            color="#de8667"
            style={{ marginBottom: "60%", cursor: "pointer" }}
            onClick={() => editQuote(quote)}
          />
          <IoCloseOutline
            color="#de8667"
            style={{ cursor: "pointer" }}
            onClick={() => deleteQuote(quote.id)}
          />
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
