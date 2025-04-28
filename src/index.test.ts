import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Connect4, PLAYER_ONE, PLAYER_TWO } from "./index.js";

describe("Connect4", () => {
  let game: Connect4;

  beforeEach(() => {
    game = new Connect4();
  });

  it("should initialize an empty board", () => {
    assert.deepStrictEqual(
      //@ts-expect-error Accessing private property for testing
      game.board.flat().every((cell: string) => cell === "⚫"),
      true,
      "Board should be empty initially"
    );
    assert.strictEqual(
      //@ts-expect-error Accessing private property for testing
      game.currentPlayer,
      PLAYER_ONE,
      "Player one should start"
    );
    assert.strictEqual(
      //@ts-expect-error Accessing private property for testing
      game.gameOver,
      false,
      "Game should not be over initially"
    );
    assert.strictEqual(
      //@ts-expect-error Accessing private property for testing
      game.winner,
      null,
      "There should be no winner initially"
    );
  });

  it("should allow a valid move", () => {
    const result = game.play(1);
    assert.strictEqual(result, "", "Valid move should return empty string");
    assert.strictEqual(
      // @ts-expect-error Accessing private property for testing
      game.board[5][0],
      PLAYER_ONE,
      "Token should be placed at the bottom of column 1"
    );
    assert.strictEqual(
      // @ts-expect-error Accessing private property for testing
      game.currentPlayer,
      PLAYER_TWO,
      "Should switch to player two"
    );
  });

  it("should reject move in invalid column (negative)", () => {
    const result = game.play(0);
    assert.strictEqual(
      result,
      "⛔ Invalid column: must be between 1 and 7",
      "Should reject column 0"
    );
  });

  it("should reject move in invalid column (too large)", () => {
    const result = game.play(8);
    assert.strictEqual(
      result,
      "⛔ Invalid column: must be between 1 and 7",
      "Should reject column 8"
    );
  });

  it("should reject move in a full column", () => {
    for (let i = 0; i < 6; i++) {
      game.play(1);
    }
    // @ts-expect-error Accessing private property for testing
    assert.strictEqual(game.board[0][0], PLAYER_TWO, "Column 1 should be full");
    const result = game.play(1); // Player one tries again
    assert.strictEqual(
      result,
      "⛔ Invalid column: column 1 is full",
      "Should reject move in full column"
    );
  });

  it("should detect a horizontal win", () => {
    game.play(1);
    game.play(1);
    game.play(2);
    game.play(2);
    game.play(3);
    game.play(3);
    const result = game.play(4); // Player One wins
    assert.strictEqual(
      result,
      `🏆 Player ${PLAYER_ONE} wins!`,
      "Should declare player one winner"
    );
    // @ts-expect-error Accessing private property for testing
    assert.strictEqual(game.gameOver, true, "Game should be over");
    // @ts-expect-error Accessing private property for testing
    assert.strictEqual(game.winner, PLAYER_ONE, "Winner should be player one");
  });

  it("should return game over message if playing after win", () => {
    game.play(1);
    game.play(1);
    game.play(2);
    game.play(2);
    game.play(3);
    game.play(3);
    game.play(4); // Player One wins
    const result = game.play(5); // Try to play again
    assert.strictEqual(
      result,
      "Game over, please start a new game",
      "Should prevent playing after game over"
    );
  });
});
