import { Connect4 } from "./index.ts";

const demo = async () => {
  const game = new Connect4();

  console.log("Game started 🎮\n");

  const playColm = async (column: number) => {
    game.play(column);
    game.print();
  };

  playColm(3); // 🔴
  playColm(6); // 🟡
  playColm(3); // 🔴
  playColm(6); // 🟡
  playColm(3); // 🔴
  playColm(6); // 🟡
  playColm(3); // 🔴
};

demo();
