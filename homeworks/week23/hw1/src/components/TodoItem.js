import React from "react";
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../redux/actions'

import styled from 'styled-components';

const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`

const TodoContent = styled.div`
  font-size: 26px;
  ${(props) => 
    props.$completed && 
    `
    text-decoration:line-through;
  } 
    `}
`

const TodoButtonContainer = styled.div``
const ToggleButton = styled.button`
  
  background: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 26px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }

  ${(props) => 
    props.$completed && 
    `
    color: rgba(0, 200, 0, 1);
    &:hover {
    background: rgba(255, 255, 255, 0.6);
    color: #333;
  } 
    `}
`
const DeleteButton = styled(ToggleButton)`
  color: rgba(255, 0, 0, 0.6);

  &:hover {
      background: rgba(255, 0, 0, 0.6);
      color: white;
    }
`

export default function TodoItem({ todo }) {
  const dispatch = useDispatch()
  return (
    <TodoWrapper>
      <TodoContent $completed={todo.isComplete === true} >{todo.content}</TodoContent>
      <TodoButtonContainer>
        <ToggleButton $completed={todo.isComplete === true} onClick={() => {
          dispatch(toggleTodo(todo.id))
        }}>{todo.isComplete ? '未完成' : '已完成'}</ToggleButton>
        <DeleteButton onClick={() => {
          dispatch(deleteTodo(todo.id))
        }}>刪除</DeleteButton>
      </TodoButtonContainer>
    </TodoWrapper>
    )
}

