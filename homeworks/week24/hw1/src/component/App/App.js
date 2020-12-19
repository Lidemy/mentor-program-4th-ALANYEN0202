import React, { useEffect } from "react";
import styled from "styled-components";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import PostPage from "../../pages/SinglePage";
import RegisterPage from "../../pages/RegisterPage";
import AboutPage from "../../pages/AboutPage";
import NewPostPage from "../../pages/NewPostPage";
import UpdatePostPage from "../../pages/UpdatePostPage"
import Header from "../Header";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getAuthToken } from "../../utilis";
import { useDispatch, useSelector } from "react-redux"
import { getTokenLogin } from "../../redux/reducers/userReducer"

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const isLoadingLogin = useSelector(store => store.users.isLoadingLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (getAuthToken() !== "") {
      dispatch(getTokenLogin())
    }
  },[dispatch])

  return (
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
            <Route path="/update-post/:id">
              <UpdatePostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
  );
}

export default App;
