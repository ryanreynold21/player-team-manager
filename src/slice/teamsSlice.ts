import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: {
    id: number;
    name: string;
    city: string;
    conference: string;
    division: string;
  };
}

export interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
  players: Player[];
}

interface TeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
      state.error = null;
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      const index = state.teams.findIndex(
        (team) => team.id === action.payload.id
      );
      if (index !== -1) {
        state.teams[index] = action.payload;
        state.error = null;
      }
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
      state.error = null;
    },
    addPlayerToTeam: (
      state,
      action: PayloadAction<{ teamId: string; player: Player }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team) {
        team.players.push(action.payload.player);
        team.playerCount = team.players.length;
      }
    },
    removePlayerFromTeam: (
      state,
      action: PayloadAction<{ teamId: string; playerId: number }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team) {
        team.players = team.players.filter(
          (p) => p.id !== action.payload.playerId
        );
        team.playerCount = team.players.length;
      }
    },
    clearTeams: (state) => {
      state.teams = [];
    },
  },
});

export const {
  setLoading,
  setError,
  addTeam,
  updateTeam,
  deleteTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
  clearTeams,
} = teamsSlice.actions;

export default teamsSlice.reducer;
