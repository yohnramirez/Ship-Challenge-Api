import { SYSTEMS, System } from "../constants/system";

export function getRandomSystem() : System {
    const index = Math.floor(Math.random() * SYSTEMS.length);
    return SYSTEMS[index];
}