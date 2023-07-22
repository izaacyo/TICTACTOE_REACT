import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick }){
  return <button className="square" onClick={onSquareClick}> {value} </button>
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true); removed to line 14 because there is no need for both true and false in state
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); //keep track of which step the user is currently viewing
  // const currentSquares = history[history.length - 1]; // rendering the final move
  const currentSquares = history[currentMove] // render the currently selected move
  const xIsNext = currentMove % 2 === 0;



    function handlePlay(nextSquares) {
   // instead of setSquares to store the state, we using history state variable
   //  setHistory([...history, nextSquares]); // create new array that contains all the history

   // only keeping that portion of the old history.
     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
     setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); //  update currentMove to point to the latest history entry.
    // setXIsNext(!xIsNext); line 9
    }

      function jumpTo(nextMove) {
        setCurrentMove(nextMove);
       // line 9 setXIsNext(nextMove % 2 === 0); // set xIsNext to true if the number that you’re changing currentMove to is even.
       }

    const moves = history.map((squares, move) => { //move argument is the moves indexes
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function Board({ xIsNext, squares, onPlay }) {
// moved to parent Game and now used as props
//  const [xIsNext, setXIsNext] = useState(true) // each time a player moves, the boolean will be filpped to determine which players goes next, saving tha state
// const [squares, setSquares] = useState(Array(9).fill(null));

  // handle the state
  function handleClick(i){
   //returning early if square alreadz has a state
    if (squares[i]  || calculateWinner(squares) ) {
      return;
    }

    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";

    } else {
      nextSquares[i] = "0";
    }

    onPlay(nextSquares);
   //  setXIsNext(!xIsNext); // why to set as false
  }

  // let player know who is the winner or status of the moves
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}




function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
