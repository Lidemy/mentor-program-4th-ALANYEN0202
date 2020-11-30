import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getSinglePage } from "../../WepAPI";
import { useParams } from "react-router-dom";

const PostContainer = styled.div`
  padding: 8px;
`;

const PostTitle = styled.div``;

const PostContext = styled.div``;

function SinglePost({ singlePost }) {
  return (
    <PostContainer>
      <PostTitle>{singlePost.title}</PostTitle>
      <PostContext>{singlePost.body}</PostContext>
    </PostContainer>
  );
}

SinglePost.propTypes = {
  singlePost: PropTypes.object,
};

export default function SinglePage() {
  let { id } = useParams();
  const [singlePost, setSinglePost] = useState({});

  useEffect(() => {
    getSinglePage(id).then((post) => setSinglePost(post));
  }, [id]);

  return <SinglePost singlePost={singlePost} />;
}
