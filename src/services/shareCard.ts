import type { View } from "react-native";
import { shareRamadanDay } from "./shareApp";

// The web preview can't turn a card into a picture, so it shares the text invite (shareCard.native.ts on phones).
export function shareRamadanCard(_card: View | null, day: number, streak: number) {
  return shareRamadanDay(day, streak);
}
