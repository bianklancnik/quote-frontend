import { QuoteType } from "../../interfaces/QuoteType";

type QuoteCardType = {
  firstName: string;
  lastName: string;
  quote: QuoteType;
};

const QuoteCard = ({ quote, firstName, lastName }: QuoteCardType) => {
  return (
    <div className="card">
      <div className="voting">
        <div>
          <svg
            width="13"
            height="7"
            viewBox="0 0 13 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 6L6.5 1L11.5 6"
              stroke="#DE8667"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="number">{quote.upvotes}</div>
        <div>
          <svg
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 1.5L6.5 6.5L1.5 1.5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="quote">
        {quote.title}
        <div className="quote-text">{quote.desc}</div>
        <div className="quote-user">
          <img className="quote-user-profile-picture" alt="" />
          <div className="content">
            {firstName} {lastName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
