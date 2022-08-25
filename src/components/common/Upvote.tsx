type UpvoteType = {
  id: string;
  voted: boolean;
  onUpvote: any;
};

const Upvote = ({ id, voted, onUpvote }: UpvoteType) => {
  const upvoteQuote = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    let upvoteQuoteUrl = `http://localhost:5000/vote/${id}/upvote`;

    fetch(upvoteQuoteUrl, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((response) => {
        onUpvote();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div onClick={() => upvoteQuote()}>
      <svg
        className="pointer"
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 6L6.5 1L11.5 6"
          stroke={`${voted ? "#DE8667" : "black"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Upvote;
