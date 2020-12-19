import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { getPost, clearPost, updatePost, clearPostResponse } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

const PostContainer = styled.div`
  text-align: center;
`;

const PostTitle = styled.input`
  margin: 8px 0px;
  font-size: 32px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 18px;
`;

const PostContext = styled.textarea`
  width: 100%;
  font-size: 18px;
  padding: 5px;
`;

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

const Form = styled.form``

const SubmitButton = styled.button`
  padding: 0px 20px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background: #333;
    color: white;
  }
`

function UpdatePost({ singlePost, isLoading, title, setTitle, textArea, setTextArea, handleUpdateSubmit }) {
  return (
    <PostContainer>
      {isLoading && <Loading>Loading ...</Loading>}
      <Form onSubmit={handleUpdateSubmit}>
        <PostTitle
          placeholder={'title'}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <PostContext
          value={textArea}
          rows="10"
          onChange={(e) => {
            setTextArea(e.target.value);
          }}
        />
        <SubmitButton>更新</SubmitButton>
      </Form>
    </PostContainer>
  );
}

UpdatePost.propTypes = {
  singlePost: PropTypes.object,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  textArea: PropTypes.string,
  setTextArea: PropTypes.func,
  handleUpdateSubmit: PropTypes.func,
};

export default function UpdatePage() {
  const [title, setTitle] = useState('');
  const [textArea, setTextArea] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const post = useSelector(store => store.posts.post)
  const newPostResponse = useSelector(store => store.posts.newPostResponse)

  const handleUpdateSubmit = () => {
    dispatch(updatePost(title, textArea, id))
  }

  useEffect(() => {
    dispatch(getPost(id)).then(post => {
      setTitle(post.title)
      setTextArea(post.body)
    })
  }, [id, dispatch]);

  useEffect(() => {
    if(newPostResponse) {
      history.push(`/posts/${newPostResponse.id}`)
    }
  })

  useEffect(() => { 
    return () => {
      dispatch(clearPost())
      dispatch(clearPostResponse())
    }
  },[dispatch])

  return <UpdatePost singlePost={post} isLoading={isLoading} title={title} setTitle={setTitle} textArea={textArea} setTextArea={setTextArea} handleUpdateSubmit={handleUpdateSubmit}/>;
}
