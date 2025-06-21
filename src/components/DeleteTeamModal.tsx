import type { Team } from "../slice/teamsSlice";

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  team: Team | null;
}

const DeleteTeamModal = ({
  isOpen,
  onClose,
  onConfirm,
  team,
}: DeleteTeamModalProps) => {
  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-theme-light border border-theme-lighter rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-theme">Delete Team</h3>
          <button
            onClick={onClose}
            className="text-theme-muted hover:text-theme transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-theme-muted mb-4">
            Are you sure you want to delete the team{" "}
            <span className="text-theme font-semibold">"{team.name}"</span>?
          </p>

          {team.players.length > 0 && (
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-sm">
                ⚠️ This team has {team.players.length} player
                {team.players.length !== 1 ? "s" : ""} assigned to it. Deleting
                the team will remove all player assignments.
              </p>
            </div>
          )}

          <p className="text-theme-muted text-sm">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-theme-lighter text-theme rounded-lg hover:bg-theme-lighter/80 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
