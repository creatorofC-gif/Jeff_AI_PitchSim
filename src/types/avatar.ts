export type AvatarState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "questioning";

export interface AvatarConfig {
  id: string;
  name: string;
  modelUrl: string;
  provider: "local" | "readyplayerme" | "metahuman" | "custom";
  gender: "male" | "female" | "neutral";
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}
