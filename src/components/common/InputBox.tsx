type InputProps = {
  text: string;
  type: string;
  value: string;
  onValueChange: any;
};

const InputBox = ({ text, type, value, onValueChange }: InputProps) => {
  return (
    <input
      type={type}
      name="name"
      placeholder={text}
      className="input-box"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

export default InputBox;
