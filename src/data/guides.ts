import type { Guide, ReflectionPrompt } from '@/types'

export const guides: Guide[] = [
  {
    id: 'guide-01',
    number: '01',
    title: 'Understanding Your Relationship Patterns',
    description:
      'Learn how repeated emotional patterns can influence the way you connect, communicate, and respond.',
    pages: 24,
    ctaLabel: 'Download Free Guide',
  },
  {
    id: 'guide-02',
    number: '02',
    title: 'The Healthier Relationship Starter Guide',
    description:
      'Simple reflection exercises and practical tools for building healthier communication and boundaries.',
    pages: 19,
    ctaLabel: 'Get the Free Guide',
  },
]

export const reflectionPrompts: ReflectionPrompt[] = [
  { id: 'r1', prompt: 'When did I first notice this pattern?' },
  { id: 'r2', prompt: 'What situations tend to trigger it?' },
  { id: 'r3', prompt: 'What am I afraid might happen if I respond differently?' },
  { id: 'r4', prompt: 'What do I actually need from my relationships?' },
  { id: 'r5', prompt: 'What would a healthier response look like?' },
]
