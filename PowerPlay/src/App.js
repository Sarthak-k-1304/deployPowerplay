import { Layout, NotFound, ProtectedRoute } from "./Components";
import {
  Gamble,
  GameCards,
  Home,
  Profile,
  ProfileStats,
  SudokuGame,
  TicTacToe,
} from "./Pages";
import { Route, Routes, Navigate } from "react-router";

export function App() {
  const username = localStorage.getItem("userName");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect to games if username is found, else show Home */}
        <Route
          index
          element={username ? <Navigate to="/games" replace /> : <Home />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="games">
            <Route index element={<GameCards />} />
            <Route path="gamble" element={<Gamble />} />
            <Route path="sudoku" element={<SudokuGame name={username} />} />
            <Route path="tictactoe" element={<TicTacToe />} />
          </Route>
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="stats" element={<ProfileStats />} />
          </Route>
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
