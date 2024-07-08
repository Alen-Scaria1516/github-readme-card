import { Request, Response } from "express";
import getData from "./helper/getData";
import template from "./helper/template";

export default async function gitHubStats(req: Request, res: Response):Promise<void> {
  try {
    let username = req.query.username;

    if (!username) {
      throw new Error("Username is required!");
    }

    let statDetails = await getData(username);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate");

    res.setHeader("Content-Type", "image/svg+xml");
    let svg = template(statDetails);
    res.send(svg);

  } catch (error: any) {
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(500).send(error.message);
  }
}
