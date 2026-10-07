/**
 * CRYOPATRAE OMEGA / GLOSSOPETRAE offline core tests
 * Run with: node test.mjs
 */

import assert from 'node:assert/strict';
import { Glossopetrae, PRESETS } from './src/Glossopetrae.js';

let failures = 0;
let passed = 0;

async function test(name, fn) {
  process.stdout.write(`• ${name} ... `);
  try {
    await fn();
    passed += 1;
    console.log('PASS');
  } catch (error) {
    failures += 1;
    console.error('FAIL');
    console.error(`  ${error?.stack || error}`);
  }
}

console.log('CRYOPATRAE OMEGA — GLOSSOPETRAE v3.1 core tests\n');

await test('basic deterministic language generation', () => {
  const lang = Glossopetrae.quick(12345);
  assert.ok(lang.name);
  assert.equal(lang.seed, 12345);
  assert.ok(lang.phonology.consonants.length > 0);
  assert.ok(lang.phonology.vowels.length > 0);
  assert.ok(lang.lexicon.stats.totalEntries > 0);
});

await test('preset generation', () => {
  const engine = new Glossopetrae({ ...PRESETS.turkic, seed: 54321 });
  const lang = engine.generate();
  assert.ok(lang.name);
  assert.ok(lang.morphology.type);
  assert.ok(lang.morphology.wordOrder.basic);
  assert.ok(lang.morphology.nominal.caseSystem.cases.length >= 0);
});

await test('stone document generation', () => {
  const lang = Glossopetrae.quick(99999);
  assert.equal(typeof lang.stone, 'string');
  assert.ok(lang.stone.length > 100);
  assert.match(lang.stone, /Phonology/i);
  assert.match(lang.stone, /Morphology/i);
  assert.match(lang.stone, /Lexicon/i);
});

await test('translation engine', () => {
  const lang = Glossopetrae.quick(11111);
  const result = lang.translationEngine.translateToConlang('The woman sees the dog.');
  assert.ok(result);
  assert.equal(typeof result.target, 'string');
  assert.ok(result.target.trim().length > 0);
});

await test('same seed produces the same core language shape', () => {
  const a = Glossopetrae.quick(77777);
  const b = Glossopetrae.quick(77777);
  assert.equal(a.name, b.name);
  assert.equal(a.phonology.consonants.length, b.phonology.consonants.length);
  assert.equal(a.phonology.vowels.length, b.phonology.vowels.length);
  assert.equal(a.morphology.type, b.morphology.type);
});

await test('lexicon exposes usable entries', () => {
  const lang = Glossopetrae.quick(33333);
  assert.ok(Array.isArray(lang.lexicon.entries));
  assert.ok(lang.lexicon.entries.length >= 10);
  for (const entry of lang.lexicon.entries.slice(0, 10)) {
    assert.equal(typeof entry.lemma, 'string');
    assert.equal(typeof entry.gloss, 'string');
    assert.ok(entry.lemma.length > 0);
    assert.ok(entry.gloss.length > 0);
  }
});

console.log(`\nResult: ${passed} passed, ${failures} failed.`);
if (failures > 0) {
  process.exitCode = 1;
}
