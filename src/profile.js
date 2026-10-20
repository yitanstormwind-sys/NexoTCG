/** The local player profile has its own key; decks and imported art are independent. */
export const PROFILE_KEY = 'nexo-player-v1';
export const XP_PER_LEVEL = 500;
const integer = value => Number.isSafeInteger(value) && value >= 0 ? Math.min(value, 100000000) : 0;
export function normalizeProfile(value, avatarIds) {
  const data = value && typeof value === 'object' ? value : {};
  const name = typeof data.name === 'string' ? data.name.trim().slice(0, 24) : '';
  return {name: name || 'Invocador', avatar: avatarIds.includes(data.avatar) ? data.avatar : avatarIds[0], xp: integer(data.xp), wins: integer(data.wins), matches: Math.max(integer(data.matches), integer(data.wins))};
}
export function readProfile(avatarIds, storage) {
  try { return normalizeProfile(JSON.parse((storage ?? globalThis.localStorage).getItem(PROFILE_KEY)), avatarIds); }
  catch { return normalizeProfile(null, avatarIds); }
}
export function saveProfile(profile, avatarIds, storage) {
  const next = normalizeProfile(profile, avatarIds);
  (storage ?? globalThis.localStorage).setItem(PROFILE_KEY, JSON.stringify(next));
  return next;
}
export function progression(profile) {
  return {level: Math.floor(profile.xp / XP_PER_LEVEL) + 1, current: profile.xp % XP_PER_LEVEL, required: XP_PER_LEVEL};
}
export function matchReward(profile, won) {
  return {...profile, xp: profile.xp + (won ? 120 : 40), matches: profile.matches + 1, wins: profile.wins + (won ? 1 : 0)};
}
