import React from "react";

const QuoteCard = () => {
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
        <div className="number">100</div>
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
        <div className="quote-text">
          Live a life you will remember, my father told me when i was just a
          child aaaaaaaaaa aaaaaaaaaaa aaaaaaa aaaaaaaaa aaaaa
        </div>
        <div className="quote-user">
          <img className="quote-user-profile-picture" alt="" />
          <div className="content">John Scott</div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
