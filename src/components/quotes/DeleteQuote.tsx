import PrimaryButton from "../common/PrimaryButton";

const DeleteQuote = (props: any) => {
  const deleteQuote = () => {
    if (props.quoteId) {
      let addQuoteUrl = `http://localhost:5000/myquote/${props.quoteId}`;

      const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

      fetch(addQuoteUrl, {
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
        .then((result) => {
          handleClick();
          props.onQuoteDelete(props.quoteId);
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
      <div className="pop-up-content-small">
        <div className="h4">Are you sure?</div>
        <div className="h6">
          This quote will be deleted. There is no undo of this action.
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div onClick={deleteQuote}>
            <PrimaryButton text="Delete" />
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

export default DeleteQuote;
