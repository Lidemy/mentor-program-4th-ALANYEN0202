/* eslint-disable import/no-unresolved, react/react-in-jsx-scope */
/* eslint-disable no-plusplus, react/jsx-filename-extension, react/prop-types */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MEDIA_QUERY_MD } from '../constants/style';
import calculateWinner from './Winner';
import { ResetButton, ReaderSquare } from './Button';

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 640px;
  margin: 0 auto;
  text-align: center;
  ${MEDIA_QUERY_MD} {
    width: 440px;
    padding: 0px;
    margin: 0 auto;
  }
`;

const NextPlayer = styled.div`
  text-align: center;
`;

function Status({ status, whiteIsNext }) {
  if (status) {
    return (
      <NextPlayer>
        Winner is
        {status === 'W' ? '白' : '黑'}
      </NextPlayer>
    );
  }
  return (
    <NextPlayer>
      NextPlayer is
      {whiteIsNext ? '白子' : '黑子'}
    </NextPlayer>
  );
}

function App() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [position, setPosition] = useState([]);
  const [winner, setWinner] = useState('');
  const [whiteIsNext, setWhiteIsNext] = useState(true);

  function updateBoard(x, y, newValue) {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y] = newValue;
    setBoard(newBoard);
  }

  function Board() {
    const handleButtonClick = (arr) => {
      if (board[arr[0]][arr[1]]) return;
      if (winner) return;
      updateBoard(arr[0], arr[1], whiteIsNext ? 'W' : 'B');
      setPosition(arr);
      setWhiteIsNext(!whiteIsNext);
    };

    const arr = [];
    for (let i = 0; i < 19; i++) {
      arr[i] = [];
      for (let j = 0; j < 19; j++) {
        arr[i][j] = (
          <ReaderSquare
            key={`${i},${j}`}
            onClick={() => {
              handleButtonClick([i, j]);
            }}
            whiteIsNext={whiteIsNext}
            value={board[i][j]}
          />
        );
      }
    }
    return arr;
  }

  useEffect(() => {
    const rowWin = calculateWinner({ board, position, type: 'row' });
    const columnWin = calculateWinner({ board, position, type: 'column' });
    const leftSlash = calculateWinner({ board, position, type: 'leftUpSlash' });
    const rightSlash = calculateWinner({
      board,
      position,
      type: 'rightUpSlash',
    });
    if (rowWin) {
      setWinner(rowWin);
    }
    if (columnWin) {
      setWinner(columnWin);
    }
    if (leftSlash) {
      setWinner(leftSlash);
    }
    if (rightSlash) {
      setWinner(rightSlash);
    }
  }, [board, position]);

  const handleResetButton = () => {
    setBoard(Array(19).fill(Array(19).fill(null)));
    setPosition([]);
    setWinner('');
    setWhiteIsNext(true);
  };

  return (
    <div className="App">
      <Title>五子棋遊戲</Title>
      <Status status={winner} whiteIsNext={whiteIsNext} />
      <ResetButton onClick={handleResetButton}>重新開始</ResetButton>
      <Wrapper>
        <Board />
      </Wrapper>
    </div>
  );
}

export default App;
