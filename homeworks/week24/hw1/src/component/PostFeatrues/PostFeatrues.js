import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { deletePost, getPosts } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


import { Link } from "react-router-dom";

const PostUpdate = styled(Link)`
  text-decoration: none;
  padding: 5px;
  border: 1px solid rgba(0, 0, 255, 0.6);
  border-radius: 8px;
  color: rgba(0, 0, 255, 0.6);
  margin-right: 5px;

  &:hover{
    color: rgba(255, 255, 255);
    background: rgba(0, 0, 255, 0.6);
    transition: all 0.2s;
  }
`
const PostDelete = styled.button`
  background: white;
  border: 1px solid rgba(255, 0, 0, 0.6);
  border-radius: 8px;
  padding: 5px;
  font-size: 16px;
  color: rgba(255, 0, 0, 0.6);

  &:hover {
    color: rgba(255, 255, 255);
    background: rgba(255, 0, 0, 0.6);
    transition: all 0.2s;
  }
`
const PostFeatruesContainer = styled.div``

PostFeatrues.propTypes = {
  post: PropTypes.object,
}

function PostFeatrues({ post }) {
  const dispatch = useDispatch()
  const limit = useSelector(store => store.posts.limit)
  const activePage = useSelector(store => store.posts.activePage)
  const history = useHistory()
  const handleDeletePost = (id) => {
    dispatch(deletePost(id)).then(() => {
    dispatch(getPosts(limit, activePage));
    history.push('/')
    });
  }

  return (
    <PostFeatruesContainer>
      <PostUpdate to={`/update-post/${post.id}`}>更新</PostUpdate>
      <PostDelete
        onClick={() => {
          handleDeletePost(post.id);
        }}
      >
        刪除
      </PostDelete>
    </PostFeatruesContainer>
  );
}

export default PostFeatrues;
