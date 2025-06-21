import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slice/authSlice";
import PlayersList from "./PlayersList";
import TeamsList from "./TeamsList";
import type { RootState } from "../types/store";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"teams" | "players">("teams");
  const { username } = useSelector((state: RootState) => state.auth);
  const { teams } = useSelector((state: RootState) => state.teams);
  const { players } = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const totalPlayers = players.length;
  const totalTeams = teams.length;
  const playersInTeams = teams.reduce(
    (acc, team) => acc + team.players.length,
    0
  );

  return (
    <div className="min-h-screen bg-theme text-theme">
      {/* Header */}
      <header className="bg-theme-light border-b border-theme-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-theme">
                Player Team Manager
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-theme-muted">
                Welcome,{" "}
                <span className="text-theme font-medium">{username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="bg-theme-light border-b border-theme-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-theme rounded-lg p-6 border border-theme-lighter">
              <h3 className="text-theme-muted text-sm font-medium">
                Total Teams
              </h3>
              <p className="text-3xl font-bold text-theme mt-2">{totalTeams}</p>
            </div>
            <div className="bg-theme rounded-lg p-6 border border-theme-lighter">
              <h3 className="text-theme-muted text-sm font-medium">
                Available Players
              </h3>
              <p className="text-3xl font-bold text-theme mt-2">
                {totalPlayers}
              </p>
            </div>
            <div className="bg-theme rounded-lg p-6 border border-theme-lighter">
              <h3 className="text-theme-muted text-sm font-medium">
                Players in Teams
              </h3>
              <p className="text-3xl font-bold text-theme mt-2">
                {playersInTeams}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-theme-lighter mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("teams")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "teams"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-theme-muted hover:text-theme hover:border-theme-lighter"
              }`}
            >
              Teams
            </button>
            <button
              onClick={() => setActiveTab("players")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "players"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-theme-muted hover:text-theme hover:border-theme-lighter"
              }`}
            >
              Players
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === "teams" ? <TeamsList /> : <PlayersList />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
