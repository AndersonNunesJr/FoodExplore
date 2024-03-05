import { Container } from "./styles";
import { React, useState, useRef } from "react";

export function Input({ icon: Icon, ...rest }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    inputRef.current.focus();
  };

  return (
    <Container onClick={handleContainerClick}>
      {search === "" && Icon && <Icon size={20} />}
      <input
        {...rest}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        ref={inputRef}
      />
    </Container>
  );
}
