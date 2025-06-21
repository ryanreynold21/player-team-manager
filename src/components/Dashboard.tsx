import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slice/authSlice";
import type { RootState } from "../types/store";
import TeamsList from "./TeamsList";
import PlayersList from "./PlayersList";

const Dashboard = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  const { teams } = useSelector((state: RootState) => state.teams);
  const { players } = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"teams" | "players">("teams");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const totalPlayersInTeams = teams.reduce(
    (sum, team) => sum + team.playerCount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Player Team Manager
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome,{" "}
                <span className="font-semibold text-blue-600">{username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-blue-600">{teams.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total Teams</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-green-600">
                {totalPlayersInTeams}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Total Players in Teams
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-purple-600">
                {players.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Available Players Fetched
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab("teams")}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === "teams"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Teams Management
              </button>
              <button
                onClick={() => setActiveTab("players")}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === "players"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Players List
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>{activeTab === "teams" ? <TeamsList /> : <PlayersList />}</div>
      </main>
    </div>
  );
};

export default Dashboard;
