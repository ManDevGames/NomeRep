import type { AssessmentQuestion } from '@/types'

export const questions: AssessmentQuestion[] = [
  {
    id: 'q1',
    prompt: 'When someone you care about becomes distant, what do you usually do?',
    helper: 'Think of a recent relationship, not just a romantic one.',
    options: [
      {
        id: 'q1-a',
        label: 'I try harder to reconnect and check in often',
        weights: { 'anxious-connector': 3, 'over-giver': 1 },
      },
      {
        id: 'q1-b',
        label: 'I give them space, and quietly pull back too',
        weights: { 'guarded-independent': 3 },
      },
      {
        id: 'q1-c',
        label: 'I wait for them to come around and avoid raising it',
        weights: { 'conflict-avoider': 3 },
      },
      {
        id: 'q1-d',
        label: 'I ask directly what’s going on for them',
        weights: { 'secure-builder': 3 },
      },
      {
        id: 'q1-e',
        label: 'I become extra supportive so they don’t pull further away',
        weights: { 'over-giver': 3 },
      },
    ],
  },
  {
    id: 'q2',
    prompt: 'During conflict, what feels most natural to you?',
    options: [
      {
        id: 'q2-a',
        label: 'Trying to smooth things over as quickly as possible',
        weights: { 'conflict-avoider': 3, 'over-giver': 1 },
      },
      {
        id: 'q2-b',
        label: 'Needing reassurance that we’re still okay',
        weights: { 'anxious-connector': 3 },
      },
      {
        id: 'q2-c',
        label: 'Wanting to step back and think it through alone',
        weights: { 'guarded-independent': 3 },
      },
      {
        id: 'q2-d',
        label: 'Saying how I feel, even if it’s uncomfortable',
        weights: { 'secure-builder': 3 },
      },
      {
        id: 'q2-e',
        label: 'Agreeing with them, even if I don’t fully mean it',
        weights: { 'conflict-avoider': 2, 'over-giver': 2 },
      },
    ],
  },
  {
    id: 'q3',
    prompt: 'How comfortable are you expressing your emotional needs?',
    options: [
      {
        id: 'q3-a',
        label: 'I rarely bring them up — I don’t want to be a burden',
        weights: { 'over-giver': 3 },
      },
      {
        id: 'q3-b',
        label: 'I bring them up but worry about how it will land',
        weights: { 'anxious-connector': 2, 'conflict-avoider': 1 },
      },
      {
        id: 'q3-c',
        label: 'I keep most of them to myself',
        weights: { 'guarded-independent': 3 },
      },
      {
        id: 'q3-d',
        label: 'Fairly comfortable, though it can still feel vulnerable',
        weights: { 'secure-builder': 3 },
      },
      {
        id: 'q3-e',
        label: 'I tend to avoid the topic altogether',
        weights: { 'conflict-avoider': 3 },
      },
    ],
  },
  {
    id: 'q4',
    prompt: 'What happens when you feel rejected?',
    options: [
      {
        id: 'q4-a',
        label: 'I replay it repeatedly and look for reassurance',
        weights: { 'anxious-connector': 3 },
      },
      {
        id: 'q4-b',
        label: 'I tell myself it’s fine and move on quickly, even if it isn’t',
        weights: { 'guarded-independent': 2, 'conflict-avoider': 1 },
      },
      {
        id: 'q4-c',
        label: 'I try to fix whatever I think I did wrong',
        weights: { 'over-giver': 3 },
      },
      {
        id: 'q4-d',
        label: 'I feel it, sit with it, and eventually talk about it',
        weights: { 'secure-builder': 3 },
      },
      {
        id: 'q4-e',
        label: 'I create distance before I can be rejected further',
        weights: { 'guarded-independent': 3 },
      },
    ],
  },
  {
    id: 'q5',
    prompt: 'Which statement sounds most like your relationships?',
    options: [
      {
        id: 'q5-a',
        label: 'I give more than I receive, and rarely ask for more',
        weights: { 'over-giver': 3 },
      },
      {
        id: 'q5-b',
        label: 'I need fairly frequent reassurance that things are okay',
        weights: { 'anxious-connector': 3 },
      },
      {
        id: 'q5-c',
        label: 'I value my independence, sometimes over closeness',
        weights: { 'guarded-independent': 3 },
      },
      {
        id: 'q5-d',
        label: 'I avoid saying things that might start a disagreement',
        weights: { 'conflict-avoider': 3 },
      },
      {
        id: 'q5-e',
        label: 'I feel mostly steady, with the usual ups and downs',
        weights: { 'secure-builder': 3 },
      },
    ],
  },
  {
    id: 'q6',
    prompt: 'When a partner or close friend asks for space, what’s your first internal reaction?',
    options: [
      {
        id: 'q6-a',
        label: 'Panic — did I do something wrong?',
        weights: { 'anxious-connector': 3 },
      },
      {
        id: 'q6-b',
        label: 'Relief — I could use some space too',
        weights: { 'guarded-independent': 2 },
      },
      {
        id: 'q6-c',
        label: 'I wonder what I can do to make things better',
        weights: { 'over-giver': 3 },
      },
      {
        id: 'q6-d',
        label: 'I respect it, though I might check in later',
        weights: { 'secure-builder': 3 },
      },
      {
        id: 'q6-e',
        label: 'I go quiet and worry about bringing it up again',
        weights: { 'conflict-avoider': 2, 'anxious-connector': 1 },
      },
    ],
  },
  {
    id: 'q7',
    prompt: 'How do you usually handle your own needs within a relationship?',
    options: [
      {
        id: 'q7-a',
        label: 'I put them last, after everyone else’s',
        weights: { 'over-giver': 3 },
      },
      {
        id: 'q7-b',
        label: 'I struggle to know what I need until I’m already overwhelmed',
        weights: { 'conflict-avoider': 2, 'over-giver': 1 },
      },
      {
        id: 'q7-c',
        label: 'I tend to meet them myself rather than relying on someone else',
        weights: { 'guarded-independent': 3 },
      },
      {
        id: 'q7-d',
        label: 'I can usually name them, even if it takes some courage',
        weights: { 'secure-builder': 3 },
      },
      {
        id: 'q7-e',
        label: 'They feel urgent and hard to set aside once they surface',
        weights: { 'anxious-connector': 2 },
      },
    ],
  },
]
