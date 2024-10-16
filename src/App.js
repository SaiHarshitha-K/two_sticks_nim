import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { COMPUTER, HUMAN, moveByComputer } from './Game';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [totalCoins, setTotalCoins] = useState(10);
  const [coins, setCoins] = useState(10);
  const [computerCoins, setComputerCoins] = useState(0);
  const [humanCoins, setHumanCoins] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [computerMoves, setComputerMoves] = useState('');
  const [humanMoves, setHumanMoves] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStartGame = () => {
    if (!currentPlayer) {
      alert('Please select who will go first.');
      return;
    }
    setCoins(totalCoins);
    setComputerCoins(0);
    setHumanCoins(0);
    setIsGameStarted(true);
  };

  const takeCoins = (num) => {
    const remainingCoins = coins - num;

    // Animate coin movement to the current player's side
    if (currentPlayer === COMPUTER) {
      setComputerCoins(computerCoins + num);
    } else {
      setHumanCoins(humanCoins + num);
    }

    if (remainingCoins === 1) {
      setCoins(remainingCoins);
      setGameOver(true);
      const winner = currentPlayer === HUMAN ? HUMAN : COMPUTER;
      setMessage(`${winner} wins by leaving one coin!`);
    } else if (remainingCoins <= 0) {
      setCoins(remainingCoins);
      setGameOver(true);
      const winner = currentPlayer === HUMAN ? COMPUTER : HUMAN;
      setMessage(`${winner} wins by avoiding the last coin!`);
    } else {
      setCoins(remainingCoins);
      setCurrentPlayer(currentPlayer === COMPUTER ? HUMAN : COMPUTER);
    }
  };

  const handleComputerMove = () => {
    const move = moveByComputer(coins);
    setComputerMoves(`Computer took ${move} coin${move > 1 ? 's' : ''}. Coins remaining after computer's move: ${coins - move}`);
    setHumanMoves(''); // Hide human's message when computer takes a turn
    takeCoins(move);
  };

  useEffect(() => {
    if (currentPlayer === COMPUTER && !gameOver && isGameStarted) {
      setTimeout(() => {
        handleComputerMove();
      }, 1000); // 5-second delay for computer move
    }
  }, [currentPlayer, gameOver, isGameStarted]);

  const handleHumanMove = (num) => {
    setHumanMoves(`You took ${num} coin${num > 1 ? 's' : ''}. Coins remaining after your move: ${coins - num}`);
    setComputerMoves(''); // Hide computer's message when human takes a turn
    takeCoins(num);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#edf1fc' }}>
      <div className="text-center">
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          {/* Instruction Icon */}
          <i
            className="fas fa-question-circle"
            style={{ fontSize: '2rem', color: '#333', cursor: 'pointer' }}
            onClick={() => setShowInstructions(true)}
          />
        </div>

        <h1>Two-Stick Nim Game</h1>

        {!isGameStarted && (
          <div>
            <label>Select who goes first:</label>
            <div>
              <button
                className={`btn ${currentPlayer === HUMAN ? 'btn-secondary' : 'btn-light'} m-2`}
                onClick={() => setCurrentPlayer(HUMAN)}
              >
                Human
              </button>
              <button
                className={`btn ${currentPlayer === COMPUTER ? 'btn-secondary' : 'btn-light'} m-2`}
                onClick={() => setCurrentPlayer(COMPUTER)}
              >
                Computer
              </button>
            </div>
            <label>Enter the number of coins:</label>
            <input
              type="number"
              className="form-control w-25 mx-auto"
              value={totalCoins}
              onChange={(e) => setTotalCoins(parseInt(e.target.value))}
              min="1"
            />
            <button className="btn btn-primary m-3" onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        )}

        {isGameStarted && (
          <>
            <div className="row mt-4">
              <div className="col-4 text-center">
                <i className="fas fa-robot" style={{ fontSize: '3rem' }}></i>
                {computerMoves && (
                  <p className="alert alert-info" style={{ backgroundColor: '#fff', color: '#000', marginTop: '10px' }}>
                    {computerMoves}
                  </p>
                )}
                <div className="coin-stack">{'🪙'.repeat(computerCoins)}</div>
              </div>

              <div className="col-4 text-center">
                <div>
                  <span style={{ fontSize: '2rem', display: 'block' }}>{'🪙'.repeat(coins)}</span>
                  <p>Coins remaining: {coins}</p>
                </div>
                <div>
                  {message && (
                    <p className={`alert ${gameOver ? 'alert-success' : 'alert-info'}`} style={{ marginTop: '20px' }}>
                      {message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-4 text-center">
                <i className="fas fa-user" style={{ fontSize: '3rem' }}></i>
                {humanMoves && (
                  <p className="alert alert-info" style={{ backgroundColor: '#fff', color: '#000', marginTop: '10px' }}>
                    {humanMoves}
                  </p>
                )}
                <div className="coin-stack">{'🪙'.repeat(humanCoins)}</div>
              </div>
            </div>

            {!gameOver && currentPlayer === HUMAN && (
              <div className="mt-3">
                <button className="btn btn-dark m-2" onClick={() => handleHumanMove(1)}>
                  Take 1 Coin
                </button>
                <button className="btn btn-dark m-2" onClick={() => handleHumanMove(2)}>
                  Take 2 Coins
                </button>
              </div>
            )}

            {gameOver && (
              <button className="btn btn-success mt-3" onClick={() => window.location.reload()}>
                Play Again
              </button>
            )}
          </>
        )}

        {/* Instruction Modal */}
        <Modal show={showInstructions} onHide={() => setShowInstructions(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Game Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Welcome to the Two-Stick Nim Game! Here’s how it works:
              <br />
              - The game starts with a selected number of coins.
              <br />
              - Players take turns removing 1 or 2 coins from the pile.
              <br />
              - The player who takes the last coin loses!
            </p>
            <p>Good luck and have fun!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowInstructions(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
