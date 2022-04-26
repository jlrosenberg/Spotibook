import { Request, Response } from "express";
import { Profile } from "../../shared/models/profile";

export const getProfile = (req: Request, res: Response<Profile>) => {
    res.send({
        name: "Testy McTesterson",
        id: '1heinh5i42t4eg',
        email: 'john@appleseed.net',
        avatar: 'https://placeimg.com/140/140/any'
    })
}