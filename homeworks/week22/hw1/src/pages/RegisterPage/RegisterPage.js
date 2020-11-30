import React, { useState, useContext } from "react";
import { register, getMe } from "../../WepAPI";
import styled from "styled-components";
import { setAuthToken } from "../../utilis";
import { AuthContext } from "../../contexts";
import { useHistory } from "react-router-dom";

const ErrorMessage = styled.div`
  color: red;
`;

const Form = styled.form`
  text-align: center;
`;

const Input = styled.input`
  margin: 0px 8px;
  padding: 8px;
`;

const InputText = styled.span`
  background: rgba(255, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
`;

const FormSubmit = styled.button`
  padding: 10px;
  background: #333;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;

  &:hover {
    border-radius: 8px;
    background: green;
    transition: all 0.1s;
  }
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(nickname, username, password).then((data) => {
      if (data.ok !== 1) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          return setErrorMessage(data.message);
        }
        setUser(res.data);
        history.push("/");
      });
    });
  };

  return (
    <Form onSubmit={handleRegisterSubmit}>
      <InputText>nickname:</InputText>
      <Input
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />
      <InputText>username:</InputText>
      <Input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <InputText>password:</InputText>
      <Input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <FormSubmit>註冊</FormSubmit>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
