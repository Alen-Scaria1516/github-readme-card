import userDetailsFetch from "./userDetailsFetch";
import {encode} from "node-base64-image";

export type GetData = {
    name: any;
    profilePic: string | Buffer;
    followers: any;
  };

export default async function getData(username: any):Promise<GetData> {
  let userDetails = await userDetailsFetch(username);
//   console.log(userDetails);

let encodedProfilePic = await encode(
    `${userDetails?.avatarUrl}&s=200`,  // Corrected the template literal
    { string: true }
  );

  let output: GetData = {
    name: userDetails?.name,
    profilePic: encodedProfilePic,
    followers: userDetails?.followers
  };

  return output;
}
