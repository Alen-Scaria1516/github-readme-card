import axios from "axios";
import getRandomToken from '../helper/generateRandomToken'
require('dotenv').config();

export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  repositories: Repositories;
  followers: Followers;
  following: Following;
  contributionsCollection: ContributionsCollection;
  openedIssues: OpenedIssues;
  closedIssues: ClosedIssues;
}

export interface Repositories {
  totalCount: number;
}

export interface Followers {
  totalCount: number;
}

export interface Following {
  totalCount: number;
}

export interface ContributionsCollection {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
}

export interface OpenedIssues {
  totalCount: number;
}

export interface ClosedIssues {
  totalCount: number;
}

export default async function basicFetch(): Promise<string> {
  const token = getRandomToken(true); // Fetches the token from environment variables

  try {
    let data = await axios({
      method: "post",
      url: "https://api.github.com/graphql",
      headers: {
        "User-Agent": "tuhinpal/readme-stats-github",
        Authorization: `Bearer ${token}`,
      },
      data: {
        query: `query {
          viewer {
            name
            login
            avatarUrl
            repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
            openedIssues: issues(states: OPEN) {
              totalCount
            }
            closedIssues: issues(states: CLOSED) {
              totalCount
            }
          }
        }`,
      },
    });

    if (data.data.errors?.length > 0) {
      throw new Error(data.data.errors[0].message);
    }

    const userData = data.data.viewer;

    // Generate SVG based on fetched user data
    const svg = generateSVG(userData);

    return svg; // Return the generated SVG string
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw new Error("Failed to fetch GitHub data");
  }
}

function generateSVG(userData: User): string {
  // Construct SVG string based on userData
  return `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- GitHub stats -->
      <rect x="0" y="0" width="60%" height="100%" fill="#f0f0f0" />
      <text x="10" y="30" font-family="Verdana" font-size="14">
        Followers: ${userData.followers.totalCount}
      </text>
      <text x="10" y="60" font-family="Verdana" font-size="14">
        Public Repos: ${userData.repositories.totalCount}
      </text>

      <!-- Profile image -->
      <circle cx="300" cy="100" r="50" fill="#f0f0f0" />
      <image href="${userData.avatarUrl}" x="250" y="50" width="100" height="100" />

      <!-- Border -->
      <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#000" stroke-width="2" />
    </svg>
  `;
}
