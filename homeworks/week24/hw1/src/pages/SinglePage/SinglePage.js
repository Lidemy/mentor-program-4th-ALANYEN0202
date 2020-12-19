import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getPost, clearPost } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';
import PostFeatrues from "../../component/PostFeatrues";


const PostContainer = styled.div`
  padding: 8px;
`;

const PostTitle = styled.div``;

const PostContext = styled.div``;

const Loading = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
`

function SinglePost({ singlePost, isLoading }) {
  const user = useSelector(store => store.users.user)
  return (
    <PostContainer>
      {isLoading &&  <Loading>Loading ...</Loading>}
      {user && <PostFeatrues post={singlePost}/>}
      <PostTitle>{singlePost.title}</PostTitle>
      <PostContext>{singlePost.body}</PostContext>
    </PostContainer>
  );
}

SinglePost.propTypes = {
  singlePost: PropTypes.object,
  isLoading: PropTypes.bool
};

export default function SinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const post = useSelector(store => store.posts.post)

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch]);

  useEffect(() => { 
    return () => {
      dispatch(clearPost())
    }
  },[dispatch])

  return <SinglePost singlePost={post} isLoading={isLoading}/>;
}
