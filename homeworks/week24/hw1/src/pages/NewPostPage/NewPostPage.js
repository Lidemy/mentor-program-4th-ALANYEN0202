import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { newPost, clearPostResponse } from "../../redux/reducers/postReducer";
import { useHistory } from "react-router-dom";



const ErrorMessage = styled.div`
  color: red;
`;

const PostContainer = styled.div`
  text-align: center;
`;

const Form = styled.form``;

const InputTitle = styled.div`
  margin: 8px 0px;
  font-size: 32px;
`;

const Input = styled.input`
  padding: 8px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 18px;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 18px;
  padding: 5px;
`;

const SubmitButton = styled.button`
  background: white;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #548c00;
    color: white;
  }
`;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch();
  const history = useHistory()
  const newPostResponse = useSelector(store => store.posts.newPostResponse)
  const isLoadingPost = useSelector(store => store.posts.isLoadingPost)
  

  const handlePostPageSubmit = () => {
    dispatch(newPost(title, textArea))
  };

  useEffect(() => {
    if(newPostResponse) {
      if(newPostResponse.ok === 0) {
        return setErrorMessage(newPostResponse.message)
      }
      history.push(`/posts/${newPostResponse.id}`)
    }
  }, [newPostResponse, history])

  useEffect(() => {
    return () => {
      dispatch(clearPostResponse())
    }
  })

  return (
    <PostContainer>
      <Form onSubmit={handlePostPageSubmit}>
        <InputTitle>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </InputTitle>
        <TextArea
          rows="10"
          value={textArea}
          onChange={(e) => {
            setTextArea(e.target.value);
          }}
        />
        {!isLoadingPost && <SubmitButton>發布文章</SubmitButton>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </PostContainer>
  );
}
