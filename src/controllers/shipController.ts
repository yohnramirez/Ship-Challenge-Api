import { Request, Response } from "express";
import { SYSTEM_CODES } from "../constants/system";
import { getRandomSystem } from "../utils/random";
import { PHASES_DATA, VolumeResponse } from "../constants/phasesPressure";

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

export const getPhaseChange = (req: Request, res: Response) => {
  const param = req.query.pressure;

  if (!param) throw new Error("pressure param is required.");

  const pressure = Number(param);

  if (isNaN(pressure)) throw new Error("pressure param must be a number.");

  const result = getInterpolatePressure(pressure, PHASES_DATA);

  if (!result) throw new Error("pressure out of range.");

  res.json(result);
};

export const getInterpolatePressure = (
  pressure: number,
  data: Record<number, VolumeResponse>
): VolumeResponse | null => {
  const savedPressures = Object.keys(data)
    .map(parseFloat)
    .sort((a, b) => a - b);
  const min = savedPressures[0];
  const max = savedPressures[savedPressures.length - 1];

  if (pressure < min || pressure > max) return null;

  if (data[pressure]) return data[pressure];

  let lower = min;
  let upper = max;

  for (let i = 0; i < savedPressures.length - 1; i++) {
    if (pressure > savedPressures[i] && pressure < savedPressures[i + 1]) {
      lower = savedPressures[i];
      upper = savedPressures[i + 1];
      break;
    }
  }

  const interpolate = (y0: number, y1: number): number => {
    return y0 + (pressure - lower) * ((y1 - y0) / (upper - lower));
  };

  return {
    specific_volume_liquid: interpolate(
      data[lower].specific_volume_liquid,
      data[upper].specific_volume_liquid
    ),
    specific_volume_vapor: interpolate(
      data[lower].specific_volume_vapor,
      data[upper].specific_volume_vapor
    ),
  };
};
