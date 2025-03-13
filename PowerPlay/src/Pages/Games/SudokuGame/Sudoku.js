import { useEffect, useRef } from "react";
import { useAppContext } from "../../../Context";
export const SudokuGame = () => {
  const { userName } = useAppContext();
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && userName) {
      iframeRef.current.onload = () => {
        // Send the player name to the Sudoku iframe
        iframeRef.current.contentWindow.postMessage(
          { type: "SEND_USERNAME", playerName: userName },
          "https://sudoku-ten-gules.vercel.app/" // Sudoku game URL
        );
      };
    }
  }, [userName]);
  return (
    <iframe
      ref={iframeRef}
      src="https://sudoku-ten-gules.vercel.app/"
      title="Sudoku Game"
      style={{
        width: "100%",
        height: "80vh",
        border: "none",
      }}
    ></iframe>
  );
};
