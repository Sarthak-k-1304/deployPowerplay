import { useEffect, useRef } from "react";
export const SudokuGame = ({ name }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        // Send the player name to the Sudoku iframe
        iframeRef.current.contentWindow.postMessage(
          { playerName: name },
          "http://127.0.0.1:5500/" // Ensure this matches your Sudoku game URL
        );
      };
    }
  }, [name]);
  return (
    <iframe
      ref={iframeRef}
      src="http://127.0.0.1:5500/index.html"
      title="Sudoku Game"
      style={{
        width: "100%",
        height: "80vh",
        border: "none",
      }}
    ></iframe>
  );
};
