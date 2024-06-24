
import styled from 'styled-components'
const Span = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'bgColor'
})`
  background-color: ${(props) => props.bgColor || "blue"};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid black;
  margin: 0 5px;
`;
const Label = styled.label` 
 display:flex;
 padding:2px 5px;
`
const Input = ({ handleChange, selected = false, value, title, color = "", name }) => {
  return (
    <Label className="sidebar-label-container">
    <input
        onChange={handleChange}
        type="radio"
        value={value}
        name={name}
        defaultChecked={selected}
      />
      {color ? "" : title}

      {color ? <Span bgColor={color} /> : ""}
    </Label>
  );
};

export default Input;