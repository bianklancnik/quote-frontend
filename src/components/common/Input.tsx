type InputProps = {
  text: string;
  type: string;
  value: string;
  onValueChange: any;
};

const Input = ({ text, type, value, onValueChange }: InputProps) => {
  return (
    <input
      type={type}
      name="name"
      placeholder={text}
      className="input"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

export default Input;
