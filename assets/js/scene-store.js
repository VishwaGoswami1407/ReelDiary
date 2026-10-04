import { rankThoughts } from './scene-core.mjs';

function readStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

class LocalSceneStore {
  mode = 'local';
  constructor(movieId) { this.key = `reeldiary-scenes-v1:${movieId}`; }
  read() {
    const entries = readStorage(this.key, []);
    if (!Array.isArray(entries)) throw new Error('Saved thoughts could not be read.');
    return entries;
  }
  write(entries) {
    try { localStorage.setItem(this.key, JSON.stringify(entries)); }
    catch { throw new Error('Your browser could not save this thought. Check that local storage is enabled.'); }
  }
  async list(scene, offset, limit) {
    const thoughts = this.read().map(entry => ({ ...entry,
      reaction_counts: entry.reactions || {},
      my_reactions: Object.keys(entry.reactions || {}),
      reaction_total: Object.values(entry.reactions || {}).reduce((sum, value) => sum + value, 0),
      is_own: true
    }));
    return rankThoughts(thoughts, scene).slice(offset, offset + limit);
  }
  async create(thought) {
    const entries = this.read();
    entries.push({ ...thought, id: crypto.randomUUID(), created_at: new Date().toISOString(), reactions: {} });
    this.write(entries);
  }
  async react(id, emoji) {
    const entries = this.read();
    const entry = entries.find(item => item.id === id);
    if (!entry) throw new Error('This thought is no longer available. Refresh the list.');
    entry.reactions ||= {};
    if (entry.reactions[emoji]) delete entry.reactions[emoji];
    else entry.reactions[emoji] = 1;
    this.write(entries);
  }
}

class SharedSceneStore {
  mode = 'shared';
  constructor(url, key, movieId) {
    this.url = url.replace(/\/$/, '');
    this.key = key;
    this.movieId = movieId;
    this.sessionKey = `reeldiary-session:${this.url}`;
    try { this.session = readStorage(this.sessionKey, null); } catch { this.session = null; }
  }
  async request(path, { method = 'GET', body, token } = {}) {
    const headers = { apikey: this.key, 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`${this.url}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: controller.signal });
      if (!response.ok) {
        if (response.status === 429) throw new Error('Too many requests. Please wait a moment and try again.');
        if (response.status === 401 || response.status === 403) throw new Error('The shared diary could not authorize this action. Check the Scene Thoughts setup.');
        throw new Error('The shared diary is unavailable. Please try again.');
      }
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      if (error.name === 'AbortError' || error instanceof TypeError) throw new Error('Could not reach the shared diary. Check your connection and retry.');
      throw error;
    } finally { clearTimeout(timer); }
  }
  async authenticate(required = false) {
    if (!this.session && !required) return null;
    if (this.session?.expires_at > Date.now() / 1000 + 60) return this.session.access_token;
    if (!this.authPromise) {
      this.authPromise = (async () => {
        const refreshing = Boolean(this.session?.refresh_token);
        const result = await this.request(refreshing ? '/auth/v1/token?grant_type=refresh_token' : '/auth/v1/signup', {
          method: 'POST', body: refreshing ? { refresh_token: this.session.refresh_token } : {}
        });
        this.session = { access_token: result.access_token, refresh_token: result.refresh_token,
          user_id: result.user.id, expires_at: result.expires_at || Date.now() / 1000 + result.expires_in };
        try { localStorage.setItem(this.sessionKey, JSON.stringify(this.session)); } catch { /* session lasts until this tab closes */ }
        return this.session.access_token;
      })().finally(() => { this.authPromise = null; });
    }
    return this.authPromise;
  }
  async list(scene, offset, limit) {
    const token = await this.authenticate();
    return await this.request('/rest/v1/rpc/get_scene_thoughts', { method: 'POST', token,
      body: { p_movie_id: this.movieId, p_scene: scene, p_limit: limit, p_offset: offset } });
  }
  async create(thought) {
    const token = await this.authenticate(true);
    await this.request('/rest/v1/scene_thoughts', { method: 'POST', token,
      body: { ...thought, movie_id: this.movieId } });
  }
  async react(id, emoji, active) {
    const token = await this.authenticate(true);
    if (active) {
      const query = new URLSearchParams({ thought_id: `eq.${id}`, user_id: `eq.${this.session.user_id}`, emoji: `eq.${emoji}` });
      await this.request(`/rest/v1/scene_reactions?${query}`, { method: 'DELETE', token });
    } else {
      await this.request('/rest/v1/scene_reactions', { method: 'POST', token, body: { thought_id: id, emoji } });
    }
  }
}

export function createSceneStore({ url, key, movieId }) {
  if (!url && !key) return new LocalSceneStore(movieId);
  if (!url || !key || !/^https:\/\//.test(url) || key.startsWith('sb_secret_')) {
    throw new Error('Scene Thoughts needs a valid Supabase URL and public key.');
  }
  return new SharedSceneStore(url, key, movieId);
}
