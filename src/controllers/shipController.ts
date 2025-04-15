import { Request, Response } from "express";
import { SYSTEM_CODES } from "../constants/system";
import { getRandomSystem } from "../utils/random";

let dagamedSystem = getRandomSystem();

export const getStatus = (req: Request, res: Response) => {
  dagamedSystem = getRandomSystem();
  res.json({ damaged_system: dagamedSystem });
};

export const getRepairBay = (req: Request, res: Response) => {
  const code = SYSTEM_CODES[dagamedSystem];
  const template = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Repair</title>
            </head>
            <body>
            <div class="anchor-point">${code}</div>
            </body>
        </html>
    `;

  res.setHeader("Content-Type", "text/html");
  res.send(template);
};

export const postTeapot = (req: Request, res: Response) => {
  const message = "I'm a teapot";
  res.status(418).send(message);
};
