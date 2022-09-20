type DownvoteType = {
  id: string;
  voted: boolean;
  onDownvote: any;
};

const Downvote = ({ id, voted, onDownvote }: DownvoteType) => {
  const downvoteQuote = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    fetch(`${process.env.REACT_APP_URL}/vote/${id}/downvote`, {
      method: "DELETE",
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
        onDownvote();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div onClick={() => downvoteQuote()}>
      <svg
        className="pointer"
        width="13"
        height="8"
        viewBox="0 0 13 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 1.5L6.5 6.5L1.5 1.5"
          stroke={`${voted ? "#DE8667" : "black"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Downvote;
