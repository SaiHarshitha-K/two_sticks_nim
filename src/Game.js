<<<<<<< HEAD
export const COMPUTER = "computer";
export const HUMAN = "human";

// Minimax algorithm with alpha-beta pruning
function minMax(state, alpha, beta, maximizingPlayer) {
  if (state === 1) {
    return maximizingPlayer ? -1 : 1;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let move of [1, 2]) {
      if (state - move > 0) {
        const score = minMax(state - move, alpha, beta, false); // Changed 'eval' to 'score'
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of [1, 2]) {
      if (state - move > 0) {
        const score = minMax(state - move, alpha, beta, true); // Changed 'eval' to 'score'
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}

// Helper function to generate valid moves
function movesCreated(state) {
  return [1, 2].filter(move => state - move > 0);
}

// Computer's strategy for choosing the optimal move
export function moveByComputer(state) {
  let bestMove = null;
  let maxEval = -Infinity;
  for (let move of movesCreated(state)) {
    const newState = state - move;
    const score = minMax(newState, -Infinity, Infinity, false);
    if (score > maxEval) {
      maxEval = score;
      bestMove = move;
    }
  }
  return bestMove;
}
=======
export const COMPUTER = "computer";
export const HUMAN = "human";

// Minimax algorithm with alpha-beta pruning
function minMax(state, alpha, beta, maximizingPlayer) {
  if (state === 1) {
    return maximizingPlayer ? -1 : 1;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let move of [1, 2]) {
      if (state - move > 0) {
        const score = minMax(state - move, alpha, beta, false); // Changed 'eval' to 'score'
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of [1, 2]) {
      if (state - move > 0) {
        const score = minMax(state - move, alpha, beta, true); // Changed 'eval' to 'score'
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}

// Helper function to generate valid moves
function movesCreated(state) {
  return [1, 2].filter(move => state - move > 0);
}

// Computer's strategy for choosing the optimal move
export function moveByComputer(state) {
  let bestMove = null;
  let maxEval = -Infinity;
  for (let move of movesCreated(state)) {
    const newState = state - move;
    const score = minMax(newState, -Infinity, Infinity, false);
    if (score > maxEval) {
      maxEval = score;
      bestMove = move;
    }
  }
  return bestMove;
}
>>>>>>> ce91e68 (Commit specific files before rebase)
