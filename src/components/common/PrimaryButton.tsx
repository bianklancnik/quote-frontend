type ButtonText = {
  text: string;
};

const PrimaryButton = ({ text }: ButtonText) => {
  return (
    <div className="primary-button" onClick={() => {}}>
      {text}
    </div>
  );
};

export default PrimaryButton;
