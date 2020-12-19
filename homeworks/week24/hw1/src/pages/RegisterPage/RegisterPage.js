import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { postRegister } from "../../redux/reducers/userReducer";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.users.errorMessage)
  const user = useSelector(store => store.users.user)

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(postRegister(nickname, username, password))
  }

  useEffect(() => {
    if(user && user.id) {
      history.push('/')
    }
  },[user, history])

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
