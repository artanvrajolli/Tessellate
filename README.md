# TESSELLATE

**Demo:** [https://artan.dev/Tessellate/](https://artan.dev/Tessellate/)

### Overview

Tessellate is a polyomino puzzle game in which the player must fill a rectangular grid with a given set of shaped pieces, leaving no empty cells. Each piece -- referred to as a sigil fragment -- can be rotated but not reflected, and must be placed on the board such that all fragments interlock without overlap. The game draws structural and thematic inspiration from the sigil puzzles of *The Talos Principle*, extending the concept into a standalone browser-based experience with curated chambers, procedurally generated puzzles, and an integrated solver for solvability verification.

---

### Chambers

The game presents eight curated chambers of increasing complexity. Each chamber is named after a stage in the philosophical arc of the Vaultkeepers' doctrine:

| Chamber | Name | Grid | Pieces | Composition |
|:-------:|------|:----:|:------:|-------------|
| I | Awakening | 4x4 | 4 | Tetrominoes |
| II | Perception | 5x4 | 5 | Tetrominoes |
| III | Convergence | 5x5 | 5 | Pentominoes |
| IV | Revelation | 6x5 | 7 | Pentominoes + Tetrominoes |
| V | Transcendence | 6x6 | 8 | Skewed Pentominoes + Tetrominoes |
| VI | Enlightenment | 7x6 | 9 | Symmetric Pentominoes + Tetrominoes |
| VII | Ascension | 8x6 | 11 | Angular Pentominoes + All Tetrominoes |
| VIII | Eternity | 8x7 | 12 | Pentominoes + Tetrominoes |

Chambers are unlocked sequentially. Progress persists across sessions via `localStorage`.

---

### Random Puzzles

Beyond the curated chambers, Tessellate offers procedurally generated puzzles at three difficulty tiers:

- **Easy** -- 4x4 grid, tetrominoes only
- **Medium** -- 5x5 grid, tetrominoes and select pentominoes
- **Hard** -- 7x6 grid, full pentomino set

The generator fills a grid by greedily placing random pieces in random rotations, then scrambles the rotations of each piece before presenting the puzzle. This guarantees solvability by construction. A fallback to a known solvable level is included for cases where the stochastic process fails within its attempt budget.

---

### Solver

The CHECK button dispatches the current board state and remaining pieces to a Web Worker (`solver-worker.js`) that performs an exact cover search via recursive backtracking. The solver iterates through all unique rotations of each unplaced piece, attempting placement at every valid board position. This runs off the main thread to prevent UI blocking. The solver reports either that the current configuration is solvable (with the count of remaining pieces) or that no solution exists from the current state, prompting the player to rearrange already-placed fragments.

---

### Controls

| Action | Input |
|--------|-------|
| Place a piece | Drag from tray onto board |
| Move a placed piece | Drag from board |
| Rotate piece (while dragging) | Right-click or scroll wheel |
| Reset chamber | RESET button |
| Verify solvability | CHECK button |
| Export level config | Ctrl+CHECK (copies JSON to clipboard) |

---

### Technical Architecture

```
index.html          Entry point, screen structure
styles.css          Theming, layout, animations (Cinzel + Rajdhani fonts)
game.js             Game logic, rendering, interaction, level definitions
solver-worker.js    Backtracking solver running in a dedicated Web Worker
```

The application is a single-page client-side web application with no build step, no framework, and no external dependencies beyond Google Fonts. State is managed through a plain JavaScript object. Rendering is performed via direct DOM manipulation. The solver operates in a `Worker` context to maintain responsiveness during exhaustive search.

**Piece representation**: Each piece is a 2D binary matrix where `1` denotes an occupied cell and `0` denotes empty space. Rotation is performed by transposing and reversing rows (90-degree clockwise). The `getAllRotations` function deduplicates symmetric rotations to avoid redundant search paths.

**Color system**: Pieces are assigned colors from a 12-color sigil palette defined as CSS custom properties. Each color has a base and a lighter variant for depth effects via `box-shadow` insets.

---

### Running

Serve the project directory with any static file server. For example:

```bash
npx serve .
```

Or simply open `index.html` in a browser. Note that the solver worker requires the file to be served over HTTP/HTTPS (not `file://`) due to browser security restrictions on `Worker` instantiation.

---

### Mathematical Note

Tessellate belongs to the class of exact cover problems. Determining whether a given set of polyominoes can tile a rectangular region is NP-complete in the general case (reducible from 3-SAT via a construction due to Golomb). The curated chambers are designed so that the solution space, while non-trivial, remains navigable by human intuition. The solver's backtracking approach is effective for the board sizes used here but would require constraint propagation or dancing-links optimization for significantly larger grids.

---

### License

This project is provided as-is for educational and recreational purposes.
