# Connect 4

A simple command-line implementation of the classic Connect 4 game, written in TypeScript.

## Features

*   Classic Connect 4 gameplay.
*   Two players (🔴 and 🟡).
*   Input validation for moves.
*   Win detection (horizontal, vertical, and diagonal).
*   Basic console output for the board state.

## Requirements

*   Node.js (v18 or higher recommended)
*   pnpm (v10.8.1 or compatible, as specified in `package.json`)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/connect-4.git
    cd connect-4
    ```
2.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```

## Usage

### Running the Development Server

To run the game script with live reloading (useful during development):

```bash
pnpm run dev
```

This command uses `tsx` to execute the `src/index.ts` file directly and watches for changes. *Note: The current `src/index.ts` primarily defines the `Connect4` class but doesn't include interactive gameplay logic out-of-the-box. You would need to add code to instantiate the class and handle user input to play directly via this script.*

### Programmatic Usage

You can import and use the `Connect4` class in your own TypeScript or JavaScript projects:

```typescript
import { Connect4, PLAYER_ONE, PLAYER_TWO } from './connect-4'; // Adjust the path as needed

const game = new Connect4();

// Player 1 plays in column 4 (user input is 1-based)
let message = game.play(4);
if (message) console.log(message);
game.print();

// Player 2 plays in column 4
message = game.play(4);
if (message) console.log(message);
game.print();

// ... continue playing

// Check game state (example - requires adding public getters or modifying visibility)
// console.log("Current Player:", game.getCurrentPlayer());
// console.log("Is Game Over?", game.isGameOver());
// console.log("Winner:", game.getWinner());
```

## Running Tests

To run the automated tests using Node.js' built-in test runner via `tsx`:

```bash
pnpm test
```

## Tech Stack

*   [TypeScript](https://www.typescriptlang.org/)
*   [Node.js](https://nodejs.org/)
*   [tsx](https://github.com/esbuild-kit/tsx) - For running TypeScript files directly.
*   [pnpm](https://pnpm.io/) - Package manager.

## License

This project is licensed under the [GPL-3.0-only](LICENSE).
