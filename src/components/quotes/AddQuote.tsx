import { useState } from "react";
import InputBox from "../common/InputBox";
import PrimaryButton from "../common/PrimaryButton";

const AddQuote = (props: any) => {
  const [quote, setQuote] = useState("");

  const quoteChange = (quote: string) => {
    setQuote(quote);
  };

  const submitQuote = () => {
    if (quote) {
      let addQuoteData = {
        desc: quote,
      };

      const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

      fetch(`${process.env.REACT_APP_URL}/myquote`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        }),
        body: JSON.stringify(addQuoteData),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          handleClick();
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
          Are you felling <span className="font-orange h4">inspired?</span>
        </div>
        <div className="h6">
          You can post quotes. You can delete them on your profile.
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
          <div onClick={submitQuote}>
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

export default AddQuote;
