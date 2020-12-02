import React, { useState, useContext } from "react";
import { login, getMe } from "../../WepAPI";
import styled from "styled-components";
import { setAuthToken } from "../../utilis";
import { AuthContext } from "../../contexts";
import { useHistory } from "react-router-dom";

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
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      const token = data.token;
      setAuthToken(token);

      getMe().then((res) => {
        if (res.ok !== 1) {
          return setErrorMessage(res.message);
        }
        setUser(res.data);
        history.push("/");
      });
    });
  };

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
