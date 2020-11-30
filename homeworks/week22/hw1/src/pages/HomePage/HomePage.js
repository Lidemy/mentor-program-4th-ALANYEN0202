import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getPosts, getLimitPosts } from "../../WepAPI";
import {  Link } from "react-router-dom";

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

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

function Pages({ allPagesNumber, pages, setPages }) {
  let arr = [];
  for (let i = 1; i <= allPagesNumber; i++) {
    arr.push(i);
  }
  return arr.map((number) => (
    <PagesButton
      key={number}
      $active={pages === number}
      onClick={() => {
        setPages(number);
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
  const limit = 5;
  const [posts, setPost] = useState([]);
  const [pages, setPages] = useState(1);
  const [allPagesNumber, setAllPagesNumber] = useState();

  useEffect(() => {
    getPosts().then((posts) => {
      setAllPagesNumber([Math.ceil(posts.length / limit)]);
    });

    getLimitPosts(limit, pages).then((posts) => setPost(posts));
  }, [pages]);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PagesContainer>
        <Pages
          allPagesNumber={allPagesNumber}
          pages={pages}
          setPages={setPages}
        />
      </PagesContainer>
    </Root>
  );
}
