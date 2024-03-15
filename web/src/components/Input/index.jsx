import { Container, StyledInput } from "./styles";
import { React, useState, useRef } from "react";

export function Input({ icon: Icon, placeholder, type, ...rest }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    inputRef.current.focus();
  };

  return (
    <Container onClick={handleContainerClick} {...rest}>
      {search === "" && Icon && <Icon size={20} />}
      <StyledInput
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        ref={inputRef}
        type={type}
      />
    </Container>
  );
}
