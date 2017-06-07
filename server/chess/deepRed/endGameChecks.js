const movesWhite = require('./movesWhite');
const movesBlack = require('./movesBlack');
const attacksBlack = require('./attacksBlack');
const attacksWhite = require('./attacksWhite');

const { getSafeMovesWhite } = movesWhite;
const { getSafeMovesBlack } = movesBlack;
const { whiteIsChecked } = attacksBlack;
const { blackIsChecked } = attacksWhite;


/**
 * Return if white has any possible available moves
 * @param {array} board
 */

const whiteCanMove = (board) => {
  const moves = getSafeMovesWhite(board);
  const pieces = Object.keys(moves);
  for (let i = 0; i < pieces.length; i += 1) {
    if (moves[pieces[i]].length > 0) return true;
  }
  return false;
};

const isCheckmateWhite = board => whiteIsChecked(board) && !whiteCanMove(board);
const isStalemateWhite = board => !whiteIsChecked(board) && !whiteCanMove(board);

/**
 * Return if white has any possible available moves
 * @param {array} board
 */

const blackCanMove = (board) => {
  const moves = getSafeMovesBlack(board);
  const pieces = Object.keys(moves);
  for (let i = 0; i < pieces.length; i += 1) {
    if (moves[pieces[i]].length > 0) return true;
  }
  return false;
};

const isCheckmateBlack = board => blackIsChecked(board) && !blackCanMove(board);
const isStalemateBlack = board => !blackIsChecked(board) && !blackCanMove(board);

module.exports = {
  isCheckmateWhite,
  isCheckmateBlack,
  isStalemateWhite,
  isStalemateBlack,
};
