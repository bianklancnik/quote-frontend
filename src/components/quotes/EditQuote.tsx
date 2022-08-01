import { useState } from "react";
import InputBox from "../common/InputBox";
import PrimaryButton from "../common/PrimaryButton";

const EditQuote = (props: any) => {
  const [quote, setQuote] = useState(props.quote.desc);

  const quoteChange = (quote: string) => {
    setQuote(quote);
  };

  const submitEditedQuote = () => {
    if (quote && quote !== props.quote.desc) {
      let editQuoteUrl = `http://localhost:5000/myquote/${props.quote.id}`;

      let editQuoteData = {
        desc: quote,
      };

      const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

      fetch(editQuoteUrl, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        }),
        body: JSON.stringify(editQuoteData),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          handleClick();
          console.log(result);
          props.onQuoteEdit(result);
        })
        .catch((err) => {
          console.error("error");
        });
    } else {
    }
  };

  const handleClick = () => {
    props.toggle();
  };

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <div className="h4">
          Edit your <span className="font-orange h4">quote.</span>
        </div>
        <InputBox
          text="All our dreams can come true, if we have the courage to pursue them."
          type="text"
          value={quote}
          onValueChange={quoteChange}
        />
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div onClick={submitEditedQuote}>
            <PrimaryButton text="Submit" />
          </div>
          <div
            className="content"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuote;
