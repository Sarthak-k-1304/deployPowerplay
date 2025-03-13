import { createGame } from "./gameController.js";
import { createButtons, createGrid } from "./uiCreation.js";
import { setupUihandler } from "./uiHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  createGrid();
  createButtons();
  let currentGame = createGame(); // create the game
  console.log("currentGame", currentGame);
  console.log("currentGame", currentGame.getName());

  setupUihandler(currentGame); // set up the buttons
});
