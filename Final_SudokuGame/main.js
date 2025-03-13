import { createGame } from "./game-controller.js";
import { createButtons, createGrid } from "./ui-creation.js";
import { setupUihandler } from "./ui-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  createGrid();
  createButtons();
  let currentGame = createGame();
  setupUihandler(currentGame);
});
