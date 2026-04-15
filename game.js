// TESSELLATE - Inspired by The Talos Principle

const LEVELS = [
  // 4x4=16: O+L+J+I4 (4 unique tetrominoes)
  { name:"AWAKENING", cols:4, rows:4, pieces:[
    {shape:[[1,1],[1,1]],color:"blue"},
    {shape:[[1,0,0],[1,1,1]],color:"green"},
    {shape:[[0,0,1],[1,1,1]],color:"yellow"},
    {shape:[[1,1,1,1]],color:"red"}
  ]},
  // 5x4=20: O+I4+L+J+S (5 unique tetrominoes)
  { name:"PERCEPTION", cols:5, rows:4, pieces:[
    {shape:[[1,1],[1,1]],color:"blue"},
    {shape:[[1,1,1,1]],color:"red"},
    {shape:[[1,0,0],[1,1,1]],color:"green"},
    {shape:[[0,0,1],[1,1,1]],color:"yellow"},
    {shape:[[0,1,1],[1,1,0]],color:"purple"}
  ]},
  // 5x5=25: I5+L5+T5+P5+V5 (5 unique pentominoes)
  { name:"CONVERGENCE", cols:5, rows:5, pieces:[
    {shape:[[1,1,1,1,1]],color:"blue"},
    {shape:[[1,0,0,0],[1,1,1,1]],color:"green"},
    {shape:[[1,1,1],[0,1,0],[0,1,0]],color:"red"},
    {shape:[[1,1],[1,1],[1,0]],color:"purple"},
    {shape:[[1,0,0],[1,0,0],[1,1,1]],color:"yellow"}
  ]},
  // 6x5=30: I5+L5+T+S+Z+L+J (2 pentominoes + 5 tetrominoes, 7 unique types)
  { name:"REVELATION", cols:6, rows:5, pieces:[
    {shape:[[1,1,1,1,1]],color:"blue"},
    {shape:[[1,0,0,0],[1,1,1,1]],color:"green"},
    {shape:[[0,1,0],[1,1,1]],color:"red"},
    {shape:[[0,1,1],[1,1,0]],color:"purple"},
    {shape:[[1,1,0],[0,1,1]],color:"cyan"},
    {shape:[[1,0,0],[1,1,1]],color:"yellow"},
    {shape:[[0,0,1],[1,1,1]],color:"green"}
  ]},
  // 6x6=36: V5+W5+N5+Z5+O+I4+L+J (4 skewed pentominoes + 4 tetrominoes)
  { name:"TRANSCENDENCE", cols:6, rows:6, pieces:[
    {shape:[[1,0,0],[1,0,0],[1,1,1]],color:"yellow"},
    {shape:[[1,0,0],[1,1,0],[0,1,1]],color:"orange"},
    {shape:[[1,1,0,0],[0,1,1,1]],color:"pink"},
    {shape:[[1,1,0],[0,1,0],[0,1,1]],color:"lime"},
    {shape:[[1,1],[1,1]],color:"blue"},
    {shape:[[1,1,1,1]],color:"red"},
    {shape:[[1,0,0],[1,1,1]],color:"green"},
    {shape:[[0,0,1],[1,1,1]],color:"purple"}
  ]},
  // 7x6=42: X5+I5+T5+P5+Y5+U5+O+I4+L (6 symmetric pentominoes + 3 tetrominoes)
  { name:"ENLIGHTENMENT", cols:7, rows:6, pieces:[
    {shape:[[0,1,0],[1,1,1],[0,1,0]],color:"teal"},
    {shape:[[1,1,1,1,1]],color:"blue"},
    {shape:[[1,1,1],[0,1,0],[0,1,0]],color:"red"},
    {shape:[[1,1],[1,1],[1,0]],color:"purple"},
    {shape:[[0,1,0,0],[1,1,1,1]],color:"indigo"},
    {shape:[[1,0,1],[1,1,1]],color:"yellow"},
    {shape:[[1,1],[1,1]],color:"green"},
    {shape:[[1,1,1,1]],color:"cyan"},
    {shape:[[1,0,0],[1,1,1]],color:"orange"}
  ]},
  // 8x6=48: L5+V5+N5+W5+O+I4+L+J+T+S+Z (4 angular pentominoes + all 7 tetrominoes)
  { name:"ASCENSION", cols:8, rows:6, pieces:[
    {shape:[[1,0,0,0],[1,1,1,1]],color:"green"},
    {shape:[[1,0,0],[1,0,0],[1,1,1]],color:"yellow"},
    {shape:[[1,1,0,0],[0,1,1,1]],color:"pink"},
    {shape:[[1,0,0],[1,1,0],[0,1,1]],color:"orange"},
    {shape:[[1,1],[1,1]],color:"blue"},
    {shape:[[1,1,1,1]],color:"red"},
    {shape:[[1,0,0],[1,1,1]],color:"cyan"},
    {shape:[[0,0,1],[1,1,1]],color:"purple"},
    {shape:[[0,1,0],[1,1,1]],color:"lime"},
    {shape:[[0,1,1],[1,1,0]],color:"teal"},
    {shape:[[1,1,0],[0,1,1]],color:"indigo"}
  ]},
  // 8x7=56: I5+L5+T5+U5+P5+F5+N5+V5+O+I4+L+J (8 unique pentominoes + 4 unique tetrominoes)
  { name:"ETERNITY", cols:8, rows:7, pieces:[
    {shape:[[1,1,1,1,1]],color:"blue"},
    {shape:[[1,0,0,0],[1,1,1,1]],color:"green"},
    {shape:[[1,1,1],[0,1,0],[0,1,0]],color:"red"},
    {shape:[[1,0,1],[1,1,1]],color:"yellow"},
    {shape:[[1,1],[1,1],[1,0]],color:"purple"},
    {shape:[[0,1,1],[1,1,0],[0,1,0]],color:"cyan"},
    {shape:[[1,1,0,0],[0,1,1,1]],color:"orange"},
    {shape:[[1,0,0],[1,0,0],[1,1,1]],color:"pink"},
    {shape:[[1,1],[1,1]],color:"lime"},
    {shape:[[1,1,1,1]],color:"teal"},
    {shape:[[1,0,0],[1,1,1]],color:"indigo"},
    {shape:[[0,0,1],[1,1,1]],color:"maroon"}
  ]}
];

const QUOTES = [
  '"What is built cannot always be understood."',
  '"The shape reveals itself to those who persist."',
  '"Order emerges from chaos, given time."',
  '"Every piece has its place in the pattern."',
  '"To see the whole, one must first see the parts."',
  '"The ancients left these keys for those who would follow."',
  '"Understanding is not given—it is earned."',
  '"At the end of all patterns lies the beginning."',
  '"There is much to be done, and you are the one to do it."',
  '"Be mindful of the steps you take, for they define the path you follow."',
  '"Is consciousness a gift or a curse?"',
  '"The point is not to live forever. The point is to live."',
  '"Not every truth is a revelation. Not every revelation is a truth."',
  '"We are not defined by our limitations, but by how we overcome them."'
];

let state = { currentLevel: 0, solved: new Set(), board: [], pieces: [], dragPiece: null, isRandom: false, randomDifficulty: null, solverWorker: null };

// Piece templates for random generation
const PIECE_TEMPLATES = {
  O:  [[1,1],[1,1]],
  I4: [[1,1,1,1]],
  L:  [[1,0,0],[1,1,1]],
  J:  [[0,0,1],[1,1,1]],
  T:  [[0,1,0],[1,1,1]],
  S:  [[0,1,1],[1,1,0]],
  Z:  [[1,1,0],[0,1,1]],
  I5: [[1,1,1,1,1]],
  L5: [[1,0,0,0],[1,1,1,1]],
  T5: [[1,1,1],[0,1,0],[0,1,0]],
  P5: [[1,1],[1,1],[1,0]],
  U5: [[1,0,1],[1,1,1]],
  F5: [[0,1,1],[1,1,0],[0,1,0]],
  N5: [[1,1,0,0],[0,1,1,1]],
  V5: [[1,0,0],[1,0,0],[1,1,1]],
  W5: [[1,0,0],[1,1,0],[0,1,1]],
  X5: [[0,1,0],[1,1,1],[0,1,0]],
  Y5: [[0,1,0,0],[1,1,1,1]],
  Z5: [[1,1,0],[0,1,0],[0,1,1]]
};

const COLORS = ['red','blue','green','yellow','purple','cyan','orange','pink','lime','teal','indigo','maroon'];

const DIFFICULTY = {
  easy:   { cols: 4, rows: 4, shapes: ['O','I4','L','J'], maxAttempts: 50 },
  medium: { cols: 5, rows: 5, shapes: ['O','I4','L','J','T','S','Z','I5','L5','T5','P5','U5','V5'], maxAttempts: 80 },
  hard:   { cols: 7, rows: 6, shapes: ['O','I4','L','J','T','S','Z','I5','L5','T5','P5','U5','F5','N5','V5','W5','X5','Y5','Z5'], maxAttempts: 150 }
};

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

function generateRandomLevel(difficulty) {
  const cfg = DIFFICULTY[difficulty];
  for (let attempt = 0; attempt < cfg.maxAttempts; attempt++) {
    const grid = Array.from({length: cfg.rows}, () => Array(cfg.cols).fill(0));
    const pieces = [];
    let success = true;

    // Fill grid by placing random pieces
    for (let iter = 0; iter < 200; iter++) {
      // Find first empty cell
      let emptyR = -1, emptyC = -1;
      outer: for (let r = 0; r < cfg.rows; r++)
        for (let c = 0; c < cfg.cols; c++)
          if (!grid[r][c]) { emptyR = r; emptyC = c; break outer; }
      if (emptyR === -1) break; // Grid full

      // Try random shapes in random rotations at positions near the empty cell
      const shapeNames = shuffleArray([...cfg.shapes]);
      let placed = false;
      for (const name of shapeNames) {
        const rots = shuffleArray(getAllRotations(PIECE_TEMPLATES[name]));
        for (const shape of rots) {
          // Try offsets so the piece covers the empty cell
          for (let dr = 0; dr < shape.length; dr++) {
            for (let dc = 0; dc < shape[0].length; dc++) {
              if (!shape[dr][dc]) continue;
              const offR = emptyR - dr;
              const offC = emptyC - dc;
              // Check placement
              let valid = true;
              for (let r = 0; r < shape.length && valid; r++)
                for (let c = 0; c < shape[r].length && valid; c++)
                  if (shape[r][c]) {
                    const br = offR + r, bc = offC + c;
                    if (br < 0 || br >= cfg.rows || bc < 0 || bc >= cfg.cols || grid[br][bc]) valid = false;
                  }
              if (valid) {
                // Place it
                for (let r = 0; r < shape.length; r++)
                  for (let c = 0; c < shape[r].length; c++)
                    if (shape[r][c]) grid[offR + r][offC + c] = pieces.length + 1;
                pieces.push({ shape, color: COLORS[pieces.length % COLORS.length] });
                placed = true;
                break;
              }
            }
            if (placed) break;
          }
          if (placed) break;
        }
        if (placed) break;
      }
      if (!placed) { success = false; break; }
    }

    if (success && grid.every(row => row.every(c => c))) {
      // Randomly rotate each piece for the puzzle presentation
      return {
        name: difficulty.toUpperCase(),
        cols: cfg.cols,
        rows: cfg.rows,
        pieces: pieces.map(p => {
          let s = p.shape;
          const rots = Math.floor(Math.random() * 4);
          for (let i = 0; i < rots; i++) s = rotateShape(s);
          return { shape: s, color: p.color };
        })
      };
    }
  }
  // Fallback: return a known solvable level
  return LEVELS[difficulty === 'easy' ? 0 : difficulty === 'medium' ? 2 : 5];
}

function startRandomLevel(difficulty) {
  const lv = generateRandomLevel(difficulty);
  state.isRandom = true;
  state.currentLevel = -1;
  state.randomLevel = lv;
  state.randomDifficulty = difficulty;
  document.getElementById('level-title').textContent = `RANDOM · ${difficulty.toUpperCase()}`;
  state.board = Array.from({length: lv.rows}, () => Array(lv.cols).fill(null));
  state.pieces = lv.pieces.map((p, i) => ({
    id: i, shape: p.shape, color: p.color, rotation: 0, placed: false, boardRow: -1, boardCol: -1
  }));
  renderBoard();
  renderPieceTray();
  showScreen('game-screen');
}

// Screen management
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Level select
function renderLevelSelect() {
  const grid = document.getElementById('level-grid');
  grid.innerHTML = '';
  LEVELS.forEach((lv, i) => {
    const card = document.createElement('div');
    card.className = 'level-card' + (state.solved.has(i) ? ' solved' : '');
    card.innerHTML = `<div class="level-num">${i+1}</div><div class="level-name">${lv.name}</div>`;
    card.onclick = () => startLevel(i);
    grid.appendChild(card);
  });
}

// Rotate shape 90° clockwise
function rotateShape(shape) {
  const rows = shape.length, cols = shape[0].length;
  const out = [];
  for (let c = 0; c < cols; c++) {
    out.push([]);
    for (let r = rows - 1; r >= 0; r--) out[c].push(shape[r][c]);
  }
  return out;
}

// Start level
function startLevel(idx) {
  state.isRandom = false;
  state.currentLevel = idx;
  const lv = LEVELS[idx];
  document.getElementById('level-title').textContent = `CHAMBER ${toRoman(idx+1)}`;
  
  // Init board
  state.board = Array.from({length: lv.rows}, () => Array(lv.cols).fill(null));
  
  // Init pieces with rotation state
  state.pieces = lv.pieces.map((p, i) => ({
    id: i, shape: p.shape, color: p.color, rotation: 0, placed: false, boardRow: -1, boardCol: -1
  }));
  
  renderBoard();
  renderPieceTray();
  showScreen('game-screen');
}

function toRoman(n) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let r = '';
  for (let i = 0; i < vals.length; i++) while (n >= vals[i]) { r += syms[i]; n -= vals[i]; }
  return r;
}

// Get current level data (works for both preset and random levels)
function getCurrentLevel() {
  return state.isRandom ? state.randomLevel : LEVELS[state.currentLevel];
}

// Get border classes for a cell within a piece shape
function getShapeBorderClasses(shape, r, c) {
    let cls = '';
    if (r === 0 || !shape[r-1][c]) cls += ' border-top';
    if (r === shape.length - 1 || (r+1 < shape.length && !shape[r+1][c])) cls += ' border-bottom';
    if (c === 0 || !shape[r][c-1]) cls += ' border-left';
    if (c === shape[0].length - 1 || (c+1 < shape[0].length && !shape[r][c+1])) cls += ' border-right';
    return cls;
}

// Build a grid of piece IDs for border detection
function buildPieceIdGrid() {
  const lv = getCurrentLevel();
  const grid = Array.from({length: lv.rows}, () => Array(lv.cols).fill(-1));
  state.pieces.forEach(p => {
    if (!p.placed) return;
    for (let r = 0; r < p.shape.length; r++)
      for (let c = 0; c < p.shape[r].length; c++)
        if (p.shape[r][c]) grid[p.boardRow + r][p.boardCol + c] = p.id;
  });
  return grid;
}

// Render board
function renderBoard() {
  const lv = getCurrentLevel();
  const board = document.getElementById('board');
  board.style.gridTemplateColumns = `repeat(${lv.cols}, var(--cell-size))`;
  board.innerHTML = '';
  const pidGrid = buildPieceIdGrid();
  for (let r = 0; r < lv.rows; r++) {
    for (let c = 0; c < lv.cols; c++) {
      const cell = document.createElement('div');
      let cls = 'cell' + (state.board[r][c] ? ` filled sigil-${state.board[r][c]}` : '');
      // Add piece border classes
      if (state.board[r][c]) {
        const pid = pidGrid[r][c];
        if (r === 0 || pidGrid[r-1][c] !== pid) cls += ' border-top';
        if (r === lv.rows-1 || pidGrid[r+1][c] !== pid) cls += ' border-bottom';
        if (c === 0 || pidGrid[r][c-1] !== pid) cls += ' border-left';
        if (c === lv.cols-1 || pidGrid[r][c+1] !== pid) cls += ' border-right';
      }
      cell.className = cls;
      cell.dataset.row = r;
      cell.dataset.col = c;
      // Drag placed piece from board
      if (state.board[r][c]) {
        cell.style.cursor = 'grab';
        cell.addEventListener('mousedown', (e) => {
          if (e.button !== 0) return;
          if (state.dragPiece) return;
          const piece = findPieceAt(r, c);
          if (piece) {
            removePieceFromBoard(piece);
            renderBoard();
            renderPieceTray();
            startDrag(e, piece);
          }
        });
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (state.dragPiece) return;
          const piece = findPieceAt(r, c);
          if (piece) {
            removePieceFromBoard(piece);
            piece.shape = rotateShape(piece.shape);
            piece.rotation = (piece.rotation + 1) % 4;
            renderBoard();
            renderPieceTray();
            startDrag(e, piece);
          }
        });
        cell.addEventListener('touchstart', (e) => {
          e.preventDefault();
          if (state.dragPiece) return;
          const piece = findPieceAt(r, c);
          if (piece) {
            removePieceFromBoard(piece);
            renderBoard();
            renderPieceTray();
            startDrag(e, piece);
          }
        }, {passive: false});
      }
      board.appendChild(cell);
    }
  }
}

// Render piece tray
function renderPieceTray() {
  const tray = document.getElementById('piece-tray');
  tray.innerHTML = '';
  state.pieces.forEach(p => {
    const wrapper = document.createElement('div');
    wrapper.className = 'piece-wrapper' + (p.placed ? ' placed' : '');
    wrapper.dataset.pieceId = p.id;
    
    const hint = document.createElement('div');
    hint.className = 'rotate-hint';
    hint.textContent = '↻';
    wrapper.appendChild(hint);
    
    const grid = document.createElement('div');
    grid.className = 'piece-grid';
    grid.style.gridTemplateColumns = `repeat(${p.shape[0].length}, 32px)`;
    
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        const cell = document.createElement('div');
        let cls = 'piece-cell ' + (p.shape[r][c] ? `sigil-${p.color}` : 'empty');
        if (p.shape[r][c]) cls += getShapeBorderClasses(p.shape, r, c);
        cell.className = cls;
        grid.appendChild(cell);
      }
    }
    
    wrapper.appendChild(grid);
    
    // Left click to rotate
    wrapper.addEventListener('click', (e) => {
      if (e.button !== 0) return;
      if (p.placed || state.dragPiece) return;
      p.shape = rotateShape(p.shape);
      p.rotation = (p.rotation + 1) % 4;
      renderPieceTray();
    });
    
    // Right click to rotate
    wrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (p.placed || state.dragPiece) return;
      p.shape = rotateShape(p.shape);
      p.rotation = (p.rotation + 1) % 4;
      renderPieceTray();
    });
    
    // Drag start (left button only)
    wrapper.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      startDrag(e, p);
    });
    wrapper.addEventListener('touchstart', (e) => { e.preventDefault(); startDrag(e, p); }, {passive: false});
    
    tray.appendChild(wrapper);
  });
}

// Drag logic
let dragGhost = null, dragOffsetX = 0, dragOffsetY = 0;

function rotateDragPiece() {
  if (!state.dragPiece) return;
  state.dragPiece.shape = rotateShape(state.dragPiece.shape);
  state.dragPiece.rotation = (state.dragPiece.rotation + 1) % 4;
  // Rebuild ghost with new shape
  rebuildDragGhost();
}

function rebuildDragGhost() {
  if (!dragGhost || !state.dragPiece) return;
  const piece = state.dragPiece;
  dragGhost.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'piece-grid';
  grid.style.gridTemplateColumns = `repeat(${piece.shape[0].length}, var(--cell-size))`;
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      const cell = document.createElement('div');
      let cls = 'piece-cell ' + (piece.shape[r][c] ? `sigil-${piece.color}` : 'empty');
      if (piece.shape[r][c]) cls += getShapeBorderClasses(piece.shape, r, c);
      cell.className = cls;
      grid.appendChild(cell);
    }
  }
  dragGhost.appendChild(grid);
  // Also update tray piece display
  renderPieceTray();
  const wrapper = document.querySelector(`[data-piece-id="${piece.id}"]`);
  if (wrapper) wrapper.classList.add('dragging');
}

function startDrag(e, piece) {
  // Piece is already removed from board before calling this
  state.dragPiece = piece;
  const wrapper = document.querySelector(`[data-piece-id="${piece.id}"]`);
  if (wrapper) wrapper.classList.add('dragging');
  
  // Create ghost
  dragGhost = document.createElement('div');
  dragGhost.className = 'drag-ghost';
  const grid = document.createElement('div');
  grid.className = 'piece-grid';
  grid.style.gridTemplateColumns = `repeat(${piece.shape[0].length}, var(--cell-size))`;
  
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      const cell = document.createElement('div');
      let cls = 'piece-cell ' + (piece.shape[r][c] ? `sigil-${piece.color}` : 'empty');
      if (piece.shape[r][c]) cls += getShapeBorderClasses(piece.shape, r, c);
      cell.className = cls;
      grid.appendChild(cell);
    }
  }
  dragGhost.appendChild(grid);
  document.body.appendChild(dragGhost);
  
  const pos = getEventPos(e);
  moveDragGhost(pos.x, pos.y);
}

function moveDragGhost(x, y) {
  if (!dragGhost) return;
  dragGhost.style.left = x + 'px';
  dragGhost.style.top = y + 'px';
  updateBoardHighlight(x, y);
}

function getEventPos(e) {
  if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

function updateBoardHighlight(mx, my) {
  clearHighlights();
  if (!state.dragPiece) return;
  
  const boardEl = document.getElementById('board');
  const rect = boardEl.getBoundingClientRect();
  const lv = getCurrentLevel();
  const cellTotal = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell-size')) + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
  
  const shape = state.dragPiece.shape;
  const shapeH = shape.length, shapeW = shape[0].length;
  
  // Center of ghost maps to center of shape
  const relX = mx - rect.left;
  const relY = my - rect.top;
  
  const centerR = Math.round(relY / cellTotal - shapeH / 2);
  const centerC = Math.round(relX / cellTotal - shapeW / 2);
  
  const valid = canPlace(state.dragPiece, centerR, centerC);
  
  for (let r = 0; r < shapeH; r++) {
    for (let c = 0; c < shapeW; c++) {
      if (!shape[r][c]) continue;
      const br = centerR + r, bc = centerC + c;
      if (br < 0 || br >= lv.rows || bc < 0 || bc >= lv.cols) continue;
      const cellEl = boardEl.children[br * lv.cols + bc];
      if (cellEl) cellEl.classList.add(valid ? 'highlight' : 'invalid');
    }
  }
}

function clearHighlights() {
  document.querySelectorAll('.cell.highlight, .cell.invalid, .cell.ghost').forEach(c => {
    c.classList.remove('highlight', 'invalid', 'ghost');
  });
}

function canPlace(piece, row, col) {
  const lv = getCurrentLevel();
  const shape = piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const br = row + r, bc = col + c;
      if (br < 0 || br >= lv.rows || bc < 0 || bc >= lv.cols) return false;
      if (state.board[br][bc] !== null) return false;
    }
  }
  return true;
}

function placePiece(piece, row, col) {
  const shape = piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) state.board[row + r][col + c] = piece.color;
    }
  }
  piece.placed = true;
  piece.boardRow = row;
  piece.boardCol = col;
}

function findPieceAt(row, col) {
  return state.pieces.find(p => {
    if (!p.placed) return false;
    const shape = p.shape;
    for (let r = 0; r < shape.length; r++)
      for (let c = 0; c < shape[r].length; c++)
        if (shape[r][c] && p.boardRow + r === row && p.boardCol + c === col) return true;
    return false;
  });
}

function removePieceFromBoard(piece) {
  if (!piece.placed) return;
  const shape = piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) state.board[piece.boardRow + r][piece.boardCol + c] = null;
    }
  }
  piece.placed = false;
  piece.boardRow = -1;
  piece.boardCol = -1;
}

function endDrag(mx, my) {
  if (!state.dragPiece) return;
  
  const boardEl = document.getElementById('board');
  const rect = boardEl.getBoundingClientRect();
  const lv = getCurrentLevel();
  const cellTotal = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell-size')) + 2;
  
  const shape = state.dragPiece.shape;
  const relX = mx - rect.left;
  const relY = my - rect.top;
  
  const centerR = Math.round(relY / cellTotal - shape.length / 2);
  const centerC = Math.round(relX / cellTotal - shape[0].length / 2);
  
  if (canPlace(state.dragPiece, centerR, centerC)) {
    placePiece(state.dragPiece, centerR, centerC);
  }
  
  // Cleanup
  if (dragGhost) { dragGhost.remove(); dragGhost = null; }
  document.querySelector(`[data-piece-id="${state.dragPiece.id}"]`)?.classList.remove('dragging');
  state.dragPiece = null;
  clearHighlights();
  renderBoard();
  renderPieceTray();
  checkWin();
}

function checkWin() {
  const lv = getCurrentLevel();
  for (let r = 0; r < lv.rows; r++)
    for (let c = 0; c < lv.cols; c++)
      if (state.board[r][c] === null) return;
  
  // Win!
  if (!state.isRandom) {
    state.solved.add(state.currentLevel);
  }
  document.getElementById('win-quote').textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  setTimeout(() => showScreen('win-screen'), 400);
}

// Global mouse/touch handlers
document.addEventListener('mousemove', (e) => {
  if (state.dragPiece) moveDragGhost(e.clientX, e.clientY);
});
document.addEventListener('mouseup', (e) => {
  if (state.dragPiece && e.button === 0) endDrag(e.clientX, e.clientY);
});
// Right-click to rotate while dragging
document.addEventListener('contextmenu', (e) => {
  if (state.dragPiece) {
    e.preventDefault();
    rotateDragPiece();
  }
});
// Scroll wheel to rotate while dragging
document.addEventListener('wheel', (e) => {
  if (state.dragPiece) {
    e.preventDefault();
    rotateDragPiece();
  }
}, {passive: false});
document.addEventListener('touchmove', (e) => {
  if (state.dragPiece) { e.preventDefault(); moveDragGhost(e.touches[0].clientX, e.touches[0].clientY); }
}, {passive: false});
document.addEventListener('touchend', (e) => {
  if (state.dragPiece) {
    const t = e.changedTouches[0];
    endDrag(t.clientX, t.clientY);
  }
});

// Button handlers
document.getElementById('btn-start').onclick = () => { renderLevelSelect(); showScreen('level-screen'); };
document.getElementById('btn-back-title').onclick = () => showScreen('title-screen');
document.getElementById('btn-back-levels').onclick = () => { renderLevelSelect(); showScreen('level-screen'); };
document.getElementById('btn-reset').onclick = () => {
  if (state.isRandom) {
    const lv = state.randomLevel;
    state.board = Array.from({length: lv.rows}, () => Array(lv.cols).fill(null));
    state.pieces = lv.pieces.map((p, i) => ({
      id: i, shape: p.shape, color: p.color, rotation: 0, placed: false, boardRow: -1, boardCol: -1
    }));
    renderBoard();
    renderPieceTray();
  } else {
    startLevel(state.currentLevel);
  }
};
document.getElementById('btn-check').onclick = (e) => {
  if (e.ctrlKey || e.metaKey) {
    exportLevelConfig();
  } else {
    checkSolvability();
  }
};

function exportLevelConfig() {
  const lv = getCurrentLevel();
  const config = {
    name: lv.name || 'CUSTOM',
    cols: lv.cols,
    rows: lv.rows,
    pieces: lv.pieces.map(p => ({ shape: p.shape, color: p.color }))
  };
  const text = JSON.stringify(config);
  navigator.clipboard.writeText(text).then(() => {
    const banner = document.createElement('div');
    banner.className = 'check-banner check-ok';
    banner.textContent = '✓ CONFIG COPIED';
    document.getElementById('board-container').appendChild(banner);
    setTimeout(() => banner.remove(), 2000);
  }).catch(() => {
    const banner = document.createElement('div');
    banner.className = 'check-banner check-fail';
    banner.textContent = '✗ COPY FAILED';
    document.getElementById('board-container').appendChild(banner);
    setTimeout(() => banner.remove(), 2000);
  });
}

function checkSolvability() {
  if (state.dragPiece) return;
  if (state.solverWorker) return; // Already running
  const lv = getCurrentLevel();
  const unplaced = state.pieces.filter(p => !p.placed);
  if (unplaced.length === 0) { showCheckResult(true, 0); return; }

  const boardCopy = state.board.map(r => [...r]);
  const piecesCopy = state.pieces.map(p => ({
    placed: p.placed, boardRow: p.boardRow, boardCol: p.boardCol,
    shape: p.shape.map(r => [...r]), color: p.color, id: p.id, rotation: p.rotation
  }));

  showCheckLoading();
  const worker = new Worker('solver-worker.js');
  state.solverWorker = worker;
  worker.onmessage = function(e) {
    const { solvable, remaining } = e.data;
    showCheckResult(solvable, remaining);
    worker.terminate();
    state.solverWorker = null;
  };
  worker.onerror = function() {
    showCheckResult(false, unplaced.length);
    worker.terminate();
    state.solverWorker = null;
  };
  worker.postMessage({ board: boardCopy, pieces: piecesCopy, rows: lv.rows, cols: lv.cols, remaining: unplaced.length });
}

function showCheckLoading() {
  const existing = document.querySelector('.check-banner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.className = 'check-banner check-loading';
  banner.textContent = '⟳ CHECKING...';
  document.getElementById('board-container').appendChild(banner);
}

function showCheckResult(solvable, remaining) {
  // Remove existing banner (loading or previous result)
  const existing = document.querySelector('.check-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'check-banner ' + (solvable ? 'check-ok' : 'check-fail');
  if (solvable) {
    banner.textContent = remaining === 0 ? '✓ COMPLETE' : `✓ SOLVABLE · ${remaining} piece${remaining !== 1 ? 's' : ''} remaining`;
  } else {
    banner.textContent = '✗ NOT SOLVABLE · rearrange placed pieces';
  }
  document.getElementById('board-container').appendChild(banner);

  // Auto-dismiss after 2.5s
  setTimeout(() => { if (banner.parentNode) banner.remove(); }, 2500);
}

document.getElementById('btn-next-level').onclick = () => {
  if (state.isRandom) {
    // Generate another random of same difficulty
    startRandomLevel(state.randomDifficulty);
  } else if (state.currentLevel + 1 < LEVELS.length) {
    startLevel(state.currentLevel + 1);
  } else {
    renderLevelSelect();
    showScreen('level-screen');
  }
};
document.getElementById('btn-win-levels').onclick = () => { renderLevelSelect(); showScreen('level-screen'); };

// Random puzzle buttons
document.getElementById('btn-rand-easy').onclick = () => startRandomLevel('easy');
document.getElementById('btn-rand-medium').onclick = () => startRandomLevel('medium');
document.getElementById('btn-rand-hard').onclick = () => startRandomLevel('hard');

// Load saved progress
try {
  const saved = localStorage.getItem('tessellate-solved');
  if (saved) state.solved = new Set(JSON.parse(saved));
} catch(e) {}

// Save progress on solve
const origCheckWin = checkWin;
const _checkWin = checkWin;
// Override to save
const origAdd = state.solved.add.bind(state.solved);
state.solved.add = function(v) {
  origAdd(v);
  try { localStorage.setItem('tessellate-solved', JSON.stringify([...state.solved])); } catch(e) {}
};



// In the beginning were the Words, and the Words made the world. I am the Words. The Words are everything. Where the Words end the world ends. You cannot go forward in an absence of space