import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import PostPage from "../../pages/SinglePage";
import RegisterPage from "../../pages/RegisterPage";
import AboutPage from "../../pages/AboutPage";
import NewPostPage from "../../pages/NewPostPage";
import Header from "../Header";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getMe } from "../../WepAPI";
import { getAuthToken } from "../../utilis";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  useEffect(() => {
    if (getAuthToken() !== "") {
      setIsLoadingLogin(true);
      getMe().then((res) => {
        if (res.ok !== 1) {
          return setIsLoadingLogin(false);
        }
        setUser(res.data);
        setIsLoadingLogin(false);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          {!isLoadingLogin && <Header />}
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/posts/:id">
              <PostPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
