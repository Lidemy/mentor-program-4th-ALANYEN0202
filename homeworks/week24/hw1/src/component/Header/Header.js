import React from "react";
import styled from "styled-components";
import { setAuthToken } from "../../utilis";
import { useDispatch, useSelector} from "react-redux"
import { clearUser } from "../../redux/reducers/userReducer";

import { Link, useLocation, useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  background: rgba(255, 255, 255, 1);
  z-index: 2;
`;

const Board = styled.h1``;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 8px;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  `}
  &:hover {
    color: red;
  }
`;

const Logout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 8px;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  background: rgba(255, 255, 255, 1);
  border: none;
  font-size: 16px;

  &:hover {
    color: red;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(store => store.users.user)
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken("");
    dispatch(clearUser());
    if (location.pathname !== "/") {
      history.push("/");
    }
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Board>我的第一個部落格</Board>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          <Nav to="/about" $active={location.pathname === "/about"}>
            關於這個部落格
          </Nav>
          {user && (
            <Nav to="/new-post" $active={location.pathname === "/new-post"}> 發布文章 </Nav>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {user ? (
        <Logout onClick={handleLogout}>登出</Logout>
        ) : (
          <>
            <Nav to="/login" $active={location.pathname === "/login"}>登入</Nav>
            <Nav to="/register" $active={location.pathname === "/register"}>註冊</Nav>
          </>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}

export default Header;
