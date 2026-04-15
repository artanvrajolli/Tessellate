// Solver Web Worker - runs puzzle solving off the main thread

function rotateShape(shape) {
  const rows = shape.length, cols = shape[0].length;
  const out = [];
  for (let c = 0; c < cols; c++) {
    out.push([]);
    for (let r = rows - 1; r >= 0; r--) out[c].push(shape[r][c]);
  }
  return out;
}

function getAllRotations(shape) {
  const seen = new Set();
  const results = [];
  let s = shape;
  for (let i = 0; i < 4; i++) {
    const key = JSON.stringify(s);
    if (!seen.has(key)) { seen.add(key); results.push(s); }
    s = rotateShape(s);
  }
  return results;
}

function canPlaceOnBoard(board, shape, row, col, rows, cols) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) {
        const br = row + r, bc = col + c;
        if (br < 0 || br >= rows || bc < 0 || bc >= cols) return false;
        if (board[br][bc] !== null) return false;
      }
  return true;
}

function placeOnBoard(board, shape, row, col, pieceId) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) board[row + r][col + c] = pieceId;
}

function unplaceOnBoard(board, shape, row, col, pieceId) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c] && board[row + r][col + c] === pieceId) board[row + r][col + c] = null;
}

function solvePuzzle(board, pieces, rows, cols) {
  const unplaced = pieces.filter(p => !p.placed);
  if (unplaced.length === 0) return pieces;

  const piece = unplaced[0];
  const rots = getAllRotations(piece.shape);

  for (const rot of rots) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (canPlaceOnBoard(board, rot, r, c, rows, cols)) {
          placeOnBoard(board, rot, r, c, piece.id);
          piece.placed = true;
          piece.boardRow = r;
          piece.boardCol = c;
          const savedShape = piece.shape;
          const savedRot = piece.rotation;
          piece.shape = rot;
          piece.rotation = (savedRot + 1) % 4;

          const result = solvePuzzle(board, pieces, rows, cols);
          if (result) return result;

          unplaceOnBoard(board, rot, r, c, piece.id);
          piece.placed = false;
          piece.boardRow = -1;
          piece.boardCol = -1;
          piece.shape = savedShape;
          piece.rotation = savedRot;
        }
      }
    }
  }
  return null;
}

self.onmessage = function(e) {
  const { board, pieces, rows, cols, remaining } = e.data;
  const solution = solvePuzzle(board, pieces, rows, cols);
  self.postMessage({ solvable: !!solution, remaining });
};
