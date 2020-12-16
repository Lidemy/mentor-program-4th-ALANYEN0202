import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { userLogin } from "../../redux/reducers/userReducer";

const ErrorMessage = styled.div`
  color: red;
`;

const Button = styled.button`
  padding: 10px;
  background: rgba(0, 0, 255, 0.7);
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;

  &:hover {
    border-radius: 8px;
    background: green;
    transition: all 0.1s;
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.users.errorMessage)
  const user = useSelector(store => store.users.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(username, password))
  }

  useEffect(() => {
    if(user && user.id) {
      history.push('/')
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      username:{" "}
      <input
        style={{ marginRight: "8px" }}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      password:{" "}
      <input
        style={{ marginRight: "8px" }}
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button>登入</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
