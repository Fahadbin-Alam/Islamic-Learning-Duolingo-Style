import { getStoredItem, setStoredItem } from "./appStorage";
import { makeFamilyId, readFamilyKids, type FamilyKid } from "./familyCode";

// The family code's id for this phone, made the first time a report is shared.
export function getFamilyId() {
  const saved = getStoredItem("sira-path-family-id");
  if (saved && /^[0-9a-z]{4,12}$/.test(saved)) return saved;
  const id = makeFamilyId();
  setStoredItem("sira-path-family-id", id);
  return id;
}

/** The id if this phone has one already; never makes one. */
export function peekFamilyId() {
  return getStoredItem("sira-path-family-id") ?? undefined;
}

export function loadFamilyKids(): FamilyKid[] {
  return readFamilyKids(getStoredItem("sira-path-family-kids"));
}

export function saveFamilyKids(kids: FamilyKid[]) {
  setStoredItem("sira-path-family-kids", JSON.stringify(kids));
}
