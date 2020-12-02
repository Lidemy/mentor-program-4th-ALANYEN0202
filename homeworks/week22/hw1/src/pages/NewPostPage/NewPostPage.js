import React, { useState } from "react";
import { postArticle } from "../../WepAPI";
import styled from "styled-components";
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
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handlePostPageSubmit = (e) => {
    setErrorMessage(null);
    console.log(textArea);
    e.preventDefault();
    postArticle(title, textArea).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      history.push("/");
    });
  };

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
        <SubmitButton>發布文章</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </PostContainer>
  );
}
