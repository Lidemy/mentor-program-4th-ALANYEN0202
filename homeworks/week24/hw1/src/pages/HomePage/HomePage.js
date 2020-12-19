import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {  Link } from "react-router-dom";
import PostFeatrues from "../../component/PostFeatrues";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, setActivePage } from "../../redux/reducers/postReducer";

const Root = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PagesContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const PagesButton = styled.button`
  font-size: 24px;
  background: white;
  border: none;
  border-bottom: 1px solid black;
  cursor: pointer;

  & + & {
    margin-left: 8px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 8px;
    transition: all 0.2s;
  }

  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border: none;
  `}
`;

const PostInfo = styled.div``

function Post({ post }) {
  const user = useSelector(store => store.users.user)
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostInfo>
        {user && <PostFeatrues post={post} />}
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </PostInfo>
    </PostContainer>
  );
}

function Pagination({ allPaginationsNumber, activePage, handlePagePagination}) {
  let arr = [];
  for (let i = 1; i <= allPaginationsNumber; i++) {
    arr.push(i);
  }
  return arr.map((number) => (
    <PagesButton
      key={number}
      $active={activePage === number}
      onClick={() => {
        handlePagePagination(number)
      }}
    >
      {number}
    </PagesButton>
  ));
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const dispatch = useDispatch()
  const post = useSelector(store => store.posts.post)
  const limit = useSelector(store => store.posts.limit)
  const activePage = useSelector(store => store.posts.activePage)
  const allPaginationsNumber = useSelector(store => store.posts.allPaginationsNumber)

  const handlePagePagination = (number) => {
    dispatch(setActivePage(number))
  }

  useEffect(() => {
    dispatch(getPosts(limit, activePage))
  },[dispatch, activePage, limit])

  return (
    <Root>
      {post.length && post.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PagesContainer>
        <Pagination
          allPaginationsNumber={allPaginationsNumber}
          activePage={activePage}
          handlePagePagination={handlePagePagination}
        />
      </PagesContainer>
    </Root>
  );
}
