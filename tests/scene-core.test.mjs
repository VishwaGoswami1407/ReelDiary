import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTimestamp, formatTimestamp, validateThought, rankThoughts } from '../assets/js/scene-core.mjs';

test('timestamps accept zero and hours, reject overflow and ambiguous input', () => {
  assert.equal(parseTimestamp('0:00'), 0);
  assert.equal(parseTimestamp('12:30'), 750);
  assert.equal(parseTimestamp('1:45:20'), 6320);
  assert.equal(formatTimestamp(6320), '1:45:20');
  for (const value of ['', '1:60', '-1:30', '100:00:00', '12:3', '2:70:10']) assert.equal(parseTimestamp(value), null);
});

test('scene match outranks popularity, then reactions outrank recency', () => {
  const thoughts = [
    { id: 'a', scene: 'ending', reaction_total: 40, created_at: '2026-10-03T12:00:00Z' },
    { id: 'b', scene: 'beginning', reaction_total: 1, created_at: '2026-10-01T12:00:00Z' },
    { id: 'c', scene: 'beginning', reaction_total: 1, created_at: '2026-10-02T12:00:00Z' },
    { id: 'd', scene: 'beginning', reaction_total: 3, created_at: '2026-09-01T12:00:00Z' }
  ];
  assert.deepEqual(rankThoughts(thoughts, 'beginning').map(item => item.id), ['d','c','b','a']);
  assert.deepEqual(rankThoughts(thoughts).map(item => item.id), ['a','d','c','b']);
  assert.deepEqual(thoughts.map(item => item.id), ['a','b','c','d']);
});

test('validation keeps user text intact and removes unrelated timestamps', () => {
  const input = { scene: 'beginning', body: '  <b>My thought</b>  ', mood: '😮', spoiler: true, timestamp: '1:02:03' };
  assert.deepEqual(validateThought(input), { scene: 'beginning', body: '<b>My thought</b>', mood: '😮', spoiler: true, timestamp_seconds: null });
  assert.equal(validateThought({ ...input, scene: 'custom', timestamp: '0:00' }).timestamp_seconds, 0);
  assert.throws(() => validateThought({ ...input, body: '  ' }));
  assert.throws(() => validateThought({ ...input, scene: 'custom', timestamp: 'bad' }));
  assert.throws(() => validateThought({ ...input, mood: 'unknown' }));
});
