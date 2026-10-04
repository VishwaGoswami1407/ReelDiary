export const SCENES = { beginning: 'Beginning', interval: 'Interval', climax: 'Climax', ending: 'Ending', custom: 'Timestamp' };
export const MOODS = { '🥰': 'Loved it', '😂': 'Made me laugh', '😢': 'Moved me', '😮': 'Surprised me', '🤯': 'Mind blown', '😡': 'Frustrated me' };
export const REACTIONS = { '❤️': 'Love', '😂': 'Laugh', '😮': 'Surprise', '😢': 'Moved' };

export function parseTimestamp(value) {
  const text = String(value).trim();
  if (!/^\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) return null;
  const parts = text.split(':').map(Number);
  const [hours, minutes, seconds] = parts.length === 3 ? parts : [0, ...parts];
  if (minutes > 59 || seconds > 59) return null;
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${rest}` : `${minutes}:${rest}`;
}

export function validateThought(input) {
  if (!Object.hasOwn(SCENES, input.scene)) throw new Error('Choose a scene first.');
  const body = input.body.trim();
  if (body.length < 3 || body.length > 1000) throw new Error('Write a thought between 3 and 1000 characters.');
  if (!Object.hasOwn(MOODS, input.mood)) throw new Error('Choose a mood.');
  const timestamp = input.scene === 'custom' ? parseTimestamp(input.timestamp) : null;
  if (input.scene === 'custom' && timestamp === null) throw new Error('Enter a timestamp such as 12:30 or 1:45:20.');
  return { scene: input.scene, body, mood: input.mood, spoiler: Boolean(input.spoiler), timestamp_seconds: timestamp };
}

export function rankThoughts(thoughts, scene = 'all') {
  return [...thoughts].sort((a, b) => {
    const matchA = scene !== 'all' && a.scene === scene ? 1 : 0;
    const matchB = scene !== 'all' && b.scene === scene ? 1 : 0;
    return matchB - matchA || Number(b.reaction_total) - Number(a.reaction_total) ||
      Date.parse(b.created_at) - Date.parse(a.created_at) || b.id.localeCompare(a.id);
  });
}
