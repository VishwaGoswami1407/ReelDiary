import { SCENES, MOODS, REACTIONS, formatTimestamp, validateThought } from './scene-core.mjs';
import { createSceneStore } from './scene-store.js';

const section = document.getElementById('scene-thoughts');
if (section) initializeSceneThoughts(section);

function initializeSceneThoughts(section) {
  const find = selector => section.querySelector(selector);
  const form = find('#scene-form');
  const list = find('#scene-list');
  const message = find('#scene-message');
  const more = find('#more-thoughts');
  const hideSpoilers = find('#hide-spoilers');
  const state = { scene: 'all', thoughts: [], revealed: new Set(), request: 0, reacting: false };
  const pageSize = 20;
  const notify = (text, error = false) => {
    message.textContent = text;
    message.classList.toggle('is-error', error);
  };
  let store;
  try {
    store = createSceneStore({ url: section.dataset.supabaseUrl, key: section.dataset.publicKey, movieId: section.dataset.movieId });
  } catch (error) {
    notify(error.message, true);
    find('#post-thought').disabled = true;
    list.setAttribute('aria-busy', 'false');
    return;
  }
  find('#scene-storage-note').textContent = store.mode === 'local'
    ? 'Local preview · Thoughts and reactions are saved only in this browser. They are not shared with other visitors yet.'
    : 'Shared diary · Thoughts are public. Your browser remembers your reactions without an email or password.';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function render() {
    list.replaceChildren();
    if (!state.thoughts.length) {
      list.append(element('p', 'empty-state', 'No thoughts pinned yet. Which moment stayed with you?'));
      find('#scene-count').textContent = 'Be the first';
      return;
    }
    find('#scene-count').textContent = `${state.thoughts.length} thought${state.thoughts.length === 1 ? '' : 's'} shown`;
    for (const thought of state.thoughts) {
      const card = element('article', 'thought-card');
      card.dataset.thoughtId = thought.id;
      card.classList.toggle('is-match', state.scene !== 'all' && thought.scene === state.scene);
      const heading = element('div', 'thought-heading');
      const title = element('h3');
      const mood = element('span', 'thought-mood', thought.mood);
      mood.setAttribute('role', 'img');
      mood.setAttribute('aria-label', MOODS[thought.mood] || 'Mood');
      title.append(mood, document.createTextNode(thought.scene === 'custom'
        ? `At ${formatTimestamp(thought.timestamp_seconds)}` : SCENES[thought.scene]));
      const time = element('time', 'thought-date', new Date(thought.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }));
      time.dateTime = thought.created_at;
      heading.append(title, time);
      card.append(heading);
      const content = element('div');
      const showBody = () => {
        content.replaceChildren(element('p', 'thought-body', thought.body));
      };
      if (thought.spoiler && hideSpoilers.checked && !state.revealed.has(thought.id)) {
        const reveal = element('button', 'spoiler-reveal', 'Spoiler hidden · Click to reveal');
        reveal.type = 'button';
        reveal.addEventListener('click', () => {
          state.revealed.add(thought.id);
          showBody();
          const body = content.querySelector('.thought-body');
          body.tabIndex = -1;
          body.focus({ preventScroll: true });
        });
        content.append(reveal);
      } else showBody();
      card.append(content);
      const reactions = element('div', 'thought-reactions');
      reactions.setAttribute('role', 'group');
      reactions.setAttribute('aria-label', 'React to this thought');
      for (const [emoji, label] of Object.entries(REACTIONS)) {
        const count = Number(thought.reaction_counts?.[emoji] || 0);
        const active = thought.my_reactions?.includes(emoji) || false;
        const button = element('button', 'reaction-button', `${emoji} ${count}`);
        button.type = 'button';
        button.dataset.emoji = emoji;
        button.setAttribute('aria-label', `${label}: ${count} reaction${count === 1 ? '' : 's'}`);
        button.setAttribute('aria-pressed', String(active));
        button.addEventListener('click', async () => {
          if (state.reacting) return;
          state.reacting = true;
          list.querySelectorAll('.reaction-button').forEach(item => { item.disabled = true; });
          try {
            await store.react(thought.id, emoji, active);
            await reload();
            const updatedCard = [...list.children].find(item => item.dataset.thoughtId === thought.id);
            [...(updatedCard?.querySelectorAll('.reaction-button') || [])].find(item => item.dataset.emoji === emoji)?.focus({ preventScroll: true });
            notify(active ? 'Reaction removed.' : 'Reaction added.');
          } catch (error) { notify(error.message, true); }
          finally {
            state.reacting = false;
            list.querySelectorAll('.reaction-button').forEach(item => { item.disabled = false; });
          }
        });
        reactions.append(button);
      }
      const total = Number(thought.reaction_total || 0);
      reactions.append(element('span', 'reaction-total', `${total} reaction${total === 1 ? '' : 's'}`));
      card.append(reactions);
      list.append(card);
    }
  }

  async function reload(append = false) {
    const request = ++state.request;
    list.setAttribute('aria-busy', 'true');
    more.disabled = true;
    try {
      const thoughts = await store.list(state.scene, append ? state.thoughts.length : 0, pageSize);
      if (request !== state.request) return;
      state.thoughts = append ? [...state.thoughts, ...thoughts.filter(item => !state.thoughts.some(old => old.id === item.id))] : thoughts;
      more.hidden = thoughts.length < pageSize;
      render();
    } finally {
      if (request === state.request) { list.setAttribute('aria-busy', 'false'); more.disabled = false; }
    }
  }

  const updateTimestamp = () => {
    const custom = find('#thought-scene').value === 'custom';
    find('#timestamp-field').hidden = !custom;
    find('#thought-timestamp').required = custom;
  };
  find('#thought-scene').addEventListener('change', updateTimestamp);
  find('#thought-body').addEventListener('input', event => { find('#thought-character-count').textContent = event.target.value.length; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = find('#post-thought');
    if (button.disabled) return;
    try {
      const fields = new FormData(form);
      const thought = validateThought({ scene: fields.get('scene'), body: fields.get('body'), mood: fields.get('mood'), timestamp: fields.get('timestamp'), spoiler: fields.has('spoiler') });
      button.disabled = true;
      await store.create(thought);
      form.reset();
      updateTimestamp();
      find('#thought-character-count').textContent = '0';
      await reload();
      notify(store.mode === 'local' ? 'Thought saved in this browser.' : 'Your thought is now shared.');
    } catch (error) { notify(error.message, true); }
    finally { button.disabled = false; }
  });
  find('.scene-filters').addEventListener('click', async event => {
    const button = event.target.closest('[data-scene]');
    if (!button) return;
    state.scene = button.dataset.scene;
    find('.scene-filters').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    find('#scene-ranking').textContent = state.scene === 'all' ? 'Most reactions first, then newest.' : `${SCENES[state.scene]} matches first, then most reactions, then newest. Other scenes follow.`;
    notify('');
    try { await reload(); } catch (error) { notify(error.message, true); }
  });
  hideSpoilers.addEventListener('change', () => { state.revealed.clear(); render(); });
  more.addEventListener('click', async () => { try { await reload(true); } catch (error) { notify(error.message, true); } });
  find('#refresh-thoughts').addEventListener('click', async () => {
    notify('');
    try { await reload(); notify('Thoughts refreshed.'); } catch (error) { notify(error.message, true); }
  });
  window.addEventListener('storage', event => {
    if (event.key === store.key) reload().catch(error => notify(error.message, true));
  });
  reload().catch(error => notify(error.message, true));
}
