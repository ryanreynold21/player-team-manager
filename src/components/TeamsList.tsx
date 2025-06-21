import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam } from "../slice/teamsSlice";
import type { RootState } from "../types/store";
import type { Team } from "../slice/teamsSlice";
import TeamModal from "./TeamModal";
import DeleteTeamModal from "./DeleteTeamModal";

const TeamsList = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state: RootState) => state.teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  const handleCreateTeam = () => {
    setEditingTeam(null);
    setIsModalOpen(true);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleDeleteTeam = (team: Team) => {
    setTeamToDelete(team);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (teamToDelete) {
      dispatch(deleteTeam(teamToDelete.id));
      setIsDeleteModalOpen(false);
      setTeamToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTeamToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-theme">Teams</h2>
        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-theme-lighter rounded-xl bg-theme-light">
          <h3 className="text-lg font-medium text-theme">
            No teams created yet
          </h3>
          <p className="text-sm text-theme-muted mt-1 mb-4">
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
              className="bg-theme-light rounded-xl border border-theme-lighter shadow-sm flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-theme text-lg mb-3">
                  {team.name}
                </h3>
                <div className="space-y-2 text-sm text-theme-muted">
                  <p>
                    <span className="font-medium text-theme">Region:</span>{" "}
                    {team.region}
                  </p>
                  <p>
                    <span className="font-medium text-theme">Country:</span>{" "}
                    {team.country}
                  </p>
                  <p>
                    <span className="font-medium text-theme">Players:</span>{" "}
                    {team.playerCount}
                  </p>
                </div>

                {team.players.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-theme text-sm mb-2">
                      Team Players:
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                      {team.players.map((player) => (
                        <div
                          key={player.id}
                          className="text-xs text-theme bg-theme-lighter p-2 rounded-md"
                        >
                          {player.first_name} {player.last_name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-theme-lighter p-4 border-t border-theme-lighter flex space-x-3">
                <button
                  onClick={() => handleEditTeam(team)}
                  className="flex-1 px-3 py-2 bg-theme border border-theme-lighter text-theme text-sm rounded-md hover:bg-theme-lighter transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeam(team)}
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

      <DeleteTeamModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        team={teamToDelete}
      />
    </div>
  );
};

export default TeamsList;
