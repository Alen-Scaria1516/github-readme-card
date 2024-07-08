import axios from "axios";

export interface User {
    name: string,
    avatarUrl: string;
    followers: number;
}

export default async function userDetailsFetch(username:any) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const data = response.data;
        console.log(data);

        const userStats:User = {
            name: data.name,
            avatarUrl: data.avatar_url,
            followers: data.followers
        }
        return userStats;
    } catch (error:any) {
        console.log('Failed to fetch github stats');
        
    }
}