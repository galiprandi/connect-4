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
  private winner: string | null;
  private moveCount: number;
  private lastMove: [number, number] | null;
  private readonly ROWS = 6;
  private readonly COLS = 7;

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
  play(userCol: number): string {
    const col = userCol - 1;
    // Check if game is over
    if (this.gameOver) return "Game over, please start a new game";
    // Check if valid column
    if (col < 0 || col > this.COLS - 1)
      return `⛔ Invalid column: must be between 1 and ${this.COLS}`;
    // Check if column is full
    if (this.board[0][col] !== EMPTY)
      return `⛔ Invalid column: column ${col + 1} is full`;
    // Drop token
    for (let row = this.ROWS - 1; row >= 0; row--) {
      if (this.board[row][col] === EMPTY) {
        // Insert token
        this.board[row][col] = this.currentPlayer;
        // Increment move count
        this.moveCount++;
        // Update last move
        this.lastMove = [row, col];

        // If player wins, return message
        if (this.checkWinner(row, col)) {
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

  private checkWinner(row: number, col: number): boolean {
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal /
      [1, -1], // Diagonal \
    ];
    const player = this.board[row][col];

    for (const [dr, dc] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i,
          c = col + dc * i;
        if (
          r < 0 ||
          r >= this.ROWS ||
          c < 0 ||
          c >= this.COLS ||
          this.board[r][c] !== player
        )
          break;
        count++;
      }
      for (let i = 1; i < 4; i++) {
        const r = row - dr * i,
          c = col - dc * i;
        if (
          r < 0 ||
          r >= this.ROWS ||
          c < 0 ||
          c >= this.COLS ||
          this.board[r][c] !== player
        )
          break;
        count++;
      }
      if (count >= 4) return true;
    }

    return false;
  }

  print() {
    this.board.forEach((row) => console.log(row.join(" ")));
    console.log("----------------\n");
    if (this.winner) console.log(`🏆 Player ${this.winner} wins!`);
    if (this.gameOver) console.log("Game over, please start a new game");
    if (!this.gameOver && !this.winner)
      console.log(`Turn: Player ${this.currentPlayer}`);
  }
}
