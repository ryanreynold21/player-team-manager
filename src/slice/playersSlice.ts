import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Player } from "./teamsSlice";

interface PlayersState {
  players: Player[];
  loading: boolean;
  error: string | null;
  nextCursor: number | null;
}

const initialState: PlayersState = {
  players: [],
  loading: false,
  error: null,
  nextCursor: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPlayers: (
      state,
      action: PayloadAction<{ players: Player[]; nextCursor: number | null }>
    ) => {
      state.players = action.payload.players;
      state.nextCursor = action.payload.nextCursor;
      state.error = null;
    },
    addPlayers: (
      state,
      action: PayloadAction<{ players: Player[]; nextCursor: number | null }>
    ) => {
      // Avoid adding duplicate players
      const newPlayers = action.payload.players.filter(
        (p) => !state.players.some((existing) => existing.id === p.id)
      );
      state.players.push(...newPlayers);
      state.nextCursor = action.payload.nextCursor;
      state.error = null;
    },
    resetPlayers: (state) => {
      state.players = [];
      state.nextCursor = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, setPlayers, addPlayers, resetPlayers } =
  playersSlice.actions;

export default playersSlice.reducer;
