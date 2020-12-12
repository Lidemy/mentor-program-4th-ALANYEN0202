import React from "react";
import { useDispatch } from "react-redux";
import { clearTodo, setFilter } from "../redux/actions";
import styled from 'styled-components';
import { VISIBILITY_FILTERS } from '../constans'

const FilterContainer = styled.div`
  position: fixed;
  top: 1%;
  right: 1%;
`

const FilterAll = styled.button`
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
`
const FilterDone = styled(FilterAll)`
  color: rgba(10, 200, 20, 1);
   &:hover {
    background: rgba(10, 200, 20, 0.8);
    color: white;
  }
`
const FilterUnDone = styled(FilterAll)`
  color: rgba(10, 20, 200, 0.8);
  &:hover {
    background: rgba(10, 20, 200, 0.8);
    color: white;
  }
`
const CleanAll = styled(FilterAll)`
  color: rgba(255, 100, 100, 1);
  &:hover {
    background: rgba(255, 0, 0, 0.6);
    color: white;
  }
`

export default function VisibilityFilters() {
  const dispatch = useDispatch();
  return (
    <FilterContainer>
      <FilterAll onClick={() => {
        dispatch(setFilter(VISIBILITY_FILTERS.ALL))
      }}>全部</FilterAll>
      <FilterDone onClick={() => {
        dispatch(setFilter(VISIBILITY_FILTERS.COMPLETED))
      }}>已完成</FilterDone>
      <FilterUnDone onClick={() => {
        dispatch(setFilter(VISIBILITY_FILTERS.UNCOMPLETE));
      }}>未完成</FilterUnDone>
      <CleanAll onClick={() => {
        dispatch(clearTodo())
      }}>清空</CleanAll>
    </FilterContainer>
  );
}

