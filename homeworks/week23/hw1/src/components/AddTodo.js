import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions";
import styled from 'styled-components';

const AddTodoContainer = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`
const Input = styled.input`
  padding: 5px;
  margin-right: 5px;
  width: 80%;
  font-size:20px;
  border: none;

  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  padding: 5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);

  &:hover {
    transform: scale(1.1);
    color: rgba(10, 50, 60, 1);
    transition: transform 0.3s;
  }
`

export default function AddTodo() {
  const dispatch = useDispatch() 
  const [value, setValue] = useState('')
  return (
    <AddTodoContainer>
      <h1>Todo List</h1>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          if(value === '') return;
          dispatch(addTodo(value));
          setValue('')
        }}
      >
        新增 Todo
      </Button>
    </AddTodoContainer>
  );
}

