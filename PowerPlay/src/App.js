import { Layout, NotFound } from "./Components";
import {
  Gamble,
  GameCards,
  Home,
  Profile,
  ProfileStats,
  SudokuGame,
  TicTacToe,
} from "./Pages";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./Components";
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="games">
            <Route index element={<GameCards />} />
            <Route path="gamble" element={<Gamble />} />
            <Route path="sudoku" element={<SudokuGame name={name} />} />
            <Route path="tictactoe" element={<TicTacToe />} />
          </Route>
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="stats" element={<ProfileStats />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
