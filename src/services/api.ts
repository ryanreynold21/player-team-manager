import type { Player } from "../slice/teamsSlice";

// Use environment variable for API key (more secure for deployment)
const API_KEY = import.meta.env.VITE_BALLDONTLIE_API_KEY || "YOUR_API_KEY_HERE";
const API_BASE_URL = "https://api.balldontlie.io/v1";

export interface PlayersResponse {
  data: Player[];
  meta: {
    next_cursor: number | null;
    per_page: number;
  };
}

export const fetchPlayers = async (
  cursor: number | null = null,
  perPage: number = 10
): Promise<PlayersResponse> => {
  const url = new URL(`${API_BASE_URL}/players`);
  url.searchParams.append("per_page", String(perPage));
  if (cursor) {
    url.searchParams.append("cursor", String(cursor));
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please check your API key.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};
