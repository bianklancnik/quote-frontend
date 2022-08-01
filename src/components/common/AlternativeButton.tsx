type ButtonText = {
  text: string;
};

const AlternativeButton = ({ text }: ButtonText) => {
  return (
    <div className="alternative-button" onClick={() => {}}>
      {text}
    </div>
  );
};

export default AlternativeButton;
