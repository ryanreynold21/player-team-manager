import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeam, updateTeam } from "../slice/teamsSlice";
import type { RootState } from "../types/store";
import type { Team } from "../slice/teamsSlice";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: Team | null;
}

const TeamModal = ({ isOpen, onClose, team }: TeamModalProps) => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state: RootState) => state.teams);

  const [formData, setFormData] = useState({
    name: "",
    region: "",
    country: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (team) {
        setFormData({
          name: team.name,
          region: team.region,
          country: team.country,
        });
      } else {
        setFormData({ name: "", region: "", country: "" });
      }
      setErrors({});
    }
  }, [team, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Team name is required";
    else if (
      teams.some(
        (t) =>
          t.name.toLowerCase() === formData.name.toLowerCase() &&
          t.id !== team?.id
      )
    ) {
      newErrors.name = "A team with this name already exists.";
    }
    if (!formData.region.trim()) newErrors.region = "Region is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const teamData = {
      ...formData,
      id: team?.id || Date.now().toString(),
      playerCount: team?.playerCount || 0,
      players: team?.players || [],
    };

    dispatch(team ? updateTeam(teamData) : addTeam(teamData));
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {team ? "Edit Team" : "Create New Team"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            {team
              ? "Update the details for your team."
              : "Enter the details for your new team."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Team Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 ring-red-300"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="e.g. The Champions"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="region"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Region
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={`w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.region
                    ? "border-red-500 ring-red-300"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="e.g. North America"
              />
              {errors.region && (
                <p className="text-red-600 text-xs mt-1">{errors.region}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.country
                    ? "border-red-500 ring-red-300"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="e.g. USA"
              />
              {errors.country && (
                <p className="text-red-600 text-xs mt-1">{errors.country}</p>
              )}
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-red-400 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {team ? "Save Changes" : "Create Team"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
