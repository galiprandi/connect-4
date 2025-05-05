/**
Connect4

Connect4 is a game where two players take turns placing a token on columns that drop to the bottom.
When a player forms 4 of his tokens in a line - horizontally, vertically,or diagonally - the player wins.

[Visualization](https://i.ebayimg.com/images/g/DzMAAOSwSjxj6m0e/s-l1600.jpg)

Implement Connect 4 with the class below.
*/

export const PLAYER_ONE = "🔴";
export const PLAYER_TWO = "🟡";
const EMPTY = "⚫";

export class Connect4 {
  private board: string[][];
  private currentPlayer: typeof PLAYER_ONE | typeof PLAYER_TWO;
  private gameOver: boolean;
  private winner: typeof PLAYER_ONE | typeof PLAYER_TWO | null;
  private moveCount: number;
  private lastMove: [number, number] | null;
  private readonly ROWS = 6;
  private readonly COLS = 7;
  // Board indexes
  private idxLeftCol = 0;
  private idxRightCol = this.COLS - 1;
  private idxTopRow = 0;
  private idxBottomRow = this.ROWS - 1;

  constructor() {
    this.board = Array.from({ length: this.ROWS }, () =>
      Array(this.COLS).fill(EMPTY)
    );
    this.currentPlayer = PLAYER_ONE;
    this.gameOver = false;
    this.winner = null;
    this.moveCount = 0;
    this.lastMove = null;
  }

  play(userColumn: number): string {
    const idxTokenCol = userColumn - 1;

    // Check if game is over
    if (this.gameOver) return "Game over, please start a new game";

    // Check if valid column
    if (idxTokenCol < this.idxLeftCol || idxTokenCol > this.idxRightCol)
      return `⛔ Invalid column: must be between 1 and ${this.COLS}`;

    // Check if column is full
    if (this.board[this.idxTopRow][idxTokenCol] !== EMPTY)
      return `⛔ Invalid column: column ${idxTokenCol + 1} is full`;

    // Try to drop token from bottom to top
    for (
      let idxTokenRow = this.idxBottomRow;
      idxTokenRow >= this.idxTopRow;
      idxTokenRow--
    ) {
      // Check if cell is empty, if so, insert token
      if (this.board[idxTokenRow][idxTokenCol] === EMPTY) {
        // Insert token
        this.board[idxTokenRow][idxTokenCol] = this.currentPlayer;
        // Increment move count
        this.moveCount++;
        // Update last move
        this.lastMove = [idxTokenRow, idxTokenCol];

        // If player wins, return message
        if (this.checkWinner(idxTokenRow, idxTokenCol)) {
          this.gameOver = true;
          this.winner = this.currentPlayer;
          return `🏆 Player ${this.winner} wins!`;
        }

        // Switch player
        this.currentPlayer =
          this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;

        break;
      }
    }
    return "";
  }

  private checkWinner(idxTokenRow: number, idxTokenCol: number): boolean {
    const directions = [
      [0, 1], //  ➡️
      [1, 0], //  ⬇️
      [1, 1], // ↘️
      [1, -1], // ↙️
    ];
    const player = this.board[idxTokenRow][idxTokenCol];

    for (const [verticalDir, horizontalDir] of directions) {
      let consecutiveTokens = 1; // Init with user token

      // Check for 4 consecutive tokens in direction
      for (let distance = 1; distance <= 3; distance++) {
        const currentRowIndex = idxTokenRow + verticalDir * distance;
        const currentColumnIndex = idxTokenCol + horizontalDir * distance;

        if (
          currentRowIndex < this.idxTopRow || // If not exceeding board by top
          currentRowIndex > this.idxBottomRow || // If not exceeding board by bottom
          currentColumnIndex < this.idxLeftCol || // If not exceeding board by left
          currentColumnIndex > this.idxRightCol || // If not exceeding board by right
          this.board[currentRowIndex][currentColumnIndex] !== player
        )
          break;

        // If token is player's, increment consecutive tokens
        consecutiveTokens++;
      }

      // Check for 4 consecutive tokens in opposite direction
      for (let distance = 1; distance <= 3; distance++) {
        const currentRowIndex = idxTokenRow - verticalDir * distance,
          currentColumnIndex = idxTokenCol - horizontalDir * distance;

        if (
          currentRowIndex < this.idxTopRow ||
          currentRowIndex > this.idxBottomRow ||
          currentColumnIndex < this.idxLeftCol ||
          currentColumnIndex > this.idxRightCol ||
          this.board[currentRowIndex][currentColumnIndex] !== player
        )
          break;

        consecutiveTokens++;
      }

      // If 4 consecutive tokens found, return user wins
      if (consecutiveTokens >= 4) return true;
    }

    return false;
  }

  print() {
    this.board.forEach((row) => console.log(row.join(" ")));
    console.log("\n");
    if (this.winner) console.log(`🏆 Player ${this.winner} wins!`);
    if (!this.gameOver && !this.winner)
      console.log(`Next player: ${this.currentPlayer}\n`);
    if (this.gameOver) console.log("\nGame over, please start a new game");
  }
}
