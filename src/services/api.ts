import type { Player } from "../slice/teamsSlice";

// IMPORTANT: You need to get your own API key from https://balldontlie.io/
const API_KEY = "ce6085ad-917b-4577-a93d-505d93855439";
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
