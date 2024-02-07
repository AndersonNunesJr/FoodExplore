import { Container } from "./styles";
import React, { useState } from "react";

export function Input({ icon: Icon, ...rest }) {
  const [isTyping, setIsTyping] = useState(false);
  return (
    <Container onClick={() => setIsTyping(false)}>
      {!isTyping && Icon && <Icon size={20} />}
      <input {...rest} onChange={(e) => setIsTyping(!!e.target.value)} />
    </Container>
  );
}
