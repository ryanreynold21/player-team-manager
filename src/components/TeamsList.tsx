import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam } from "../slice/teamsSlice";
import type { RootState } from "../types/store";
import type { Team } from "../slice/teamsSlice";
import TeamModal from "./TeamModal";

const TeamsList = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state: RootState) => state.teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const handleCreateTeam = () => {
    setEditingTeam(null);
    setIsModalOpen(true);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleDeleteTeam = (teamId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this team? This action cannot be undone."
      )
    ) {
      dispatch(deleteTeam(teamId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Teams</h2>
        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900">
            No teams created yet
          </h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Get started by creating your first team.
          </p>
          <button
            onClick={handleCreateTeam}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Create Your First Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-gray-800 text-lg mb-3">
                  {team.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Region:</span>{" "}
                    {team.region}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Country:</span>{" "}
                    {team.country}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Players:</span>{" "}
                    {team.playerCount}
                  </p>
                </div>

                {team.players.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 text-sm mb-2">
                      Team Players:
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                      {team.players.map((player) => (
                        <div
                          key={player.id}
                          className="text-xs text-gray-700 bg-gray-100 p-2 rounded-md"
                        >
                          {player.first_name} {player.last_name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-200 flex space-x-3">
                <button
                  onClick={() => handleEditTeam(team)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeam(team.id)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        team={editingTeam}
      />
    </div>
  );
};

export default TeamsList;
