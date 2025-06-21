import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setPlayers,
  addPlayers,
  resetPlayers,
} from "../slice/playersSlice";
import { addPlayerToTeam, removePlayerFromTeam } from "../slice/teamsSlice";
import { fetchPlayers } from "../services/api";
import type { RootState } from "../types/store";
import type { Player } from "../slice/teamsSlice";

const PlayersList = () => {
  const dispatch = useDispatch();
  const { players, loading, error, nextCursor } = useSelector(
    (state: RootState) => state.players
  );
  const { teams } = useSelector((state: RootState) => state.teams);
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const hasMore = nextCursor !== null;

  const lastPlayerElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePlayers();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadPlayers = async (
    cursor: number | null = null,
    append: boolean = false
  ) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await fetchPlayers(cursor, 10);

      const action = append ? addPlayers : setPlayers;
      dispatch(
        action({
          players: response.data,
          nextCursor: response.meta.next_cursor,
        })
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch players";
      if (errorMessage.includes("API key")) {
        dispatch(
          setError(
            "Invalid or missing API Key. Please add your key to src/services/api.ts"
          )
        );
      } else {
        dispatch(setError(errorMessage));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadMorePlayers = () => {
    if (!loading && hasMore) {
      loadPlayers(nextCursor, true);
    }
  };

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers(null, false);
    }

    return () => {
      // Optional: Reset players when component unmounts if desired
      // dispatch(resetPlayers());
    };
  }, []);

  const isPlayerInAnyTeam = (playerId: number): boolean => {
    return teams.some((team) =>
      team.players.some((player) => player.id === playerId)
    );
  };

  const getPlayerTeam = (playerId: number) => {
    return teams.find((team) =>
      team.players.some((player) => player.id === playerId)
    );
  };

  const handleAddToTeam = (player: Player, teamId: string) => {
    dispatch(addPlayerToTeam({ teamId, player }));
  };

  const handleRemoveFromTeam = (playerId: number) => {
    const team = getPlayerTeam(playerId);
    if (team) {
      dispatch(removePlayerFromTeam({ teamId: team.id, playerId }));
    }
  };

  if (error && players.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-red-300 rounded-xl bg-red-900/20">
        <h3 className="text-lg font-medium text-red-300">
          Failed to fetch players
        </h3>
        <p className="text-sm text-red-200 mt-1 mb-4">{error}</p>
        <button
          onClick={() => loadPlayers(null, false)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-theme">Available Players</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => {
          const isInTeam = isPlayerInAnyTeam(player.id);
          const playerTeam = getPlayerTeam(player.id);

          return (
            <div
              key={`${player.id}-${index}`}
              ref={index === players.length - 1 ? lastPlayerElementRef : null}
              className={`bg-theme-light rounded-xl border shadow-sm flex flex-col ${
                isInTeam ? "border-green-400" : "border-theme-lighter"
              }`}
            >
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-theme text-lg">
                  {player.first_name} {player.last_name}
                </h3>
                <p className="text-sm text-theme-muted mt-1">
                  Position: {player.position || "N/A"}
                </p>
                {player.team && (
                  <p className="text-sm text-theme-muted">
                    From: {player.team.name}
                  </p>
                )}
              </div>

              <div className="bg-theme-lighter p-4 border-t border-theme-lighter">
                {isInTeam ? (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-300 font-medium">
                      In Team:{" "}
                      <span className="font-bold">{playerTeam?.name}</span>
                    </p>
                    <button
                      onClick={() => handleRemoveFromTeam(player.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <select
                      onChange={(e) =>
                        e.target.value &&
                        handleAddToTeam(player, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-theme-lighter rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-theme text-theme"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Add to team...
                      </option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    {teams.length === 0 && (
                      <p className="text-xs text-theme-muted mt-2">
                        No teams available. Create a team first.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-6">
          <p className="text-theme-muted">Loading more players...</p>
        </div>
      )}

      {!hasMore && players.length > 0 && (
        <div className="text-center py-6">
          <p className="text-theme-muted text-sm">
            You've reached the end of the list.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayersList;
