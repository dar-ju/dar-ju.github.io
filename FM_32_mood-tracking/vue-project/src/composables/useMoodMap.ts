export const useMoodMap = () => {
  const moodMap = {
    '2': {
      title: 'Very Happy',
      img: '/assets/images/icon-very-happy-white.svg',
      imgColor: '/assets/images/icon-very-happy-color.svg',
      color: 'var(--other-amber-300)',
      quotes: [
        'When your heart is full, share your light with the world.',
        'Savor the highs in life; they become precious memories.',
        'Joy multiplies when spread among friends.',
        "Trust your journey; you're in a beautiful place right now.",
        'Let your happiness ripple out and inspire others.',
      ],
    },
    '1': {
      title: 'Happy',
      img: '/assets/images/icon-happy-white.svg',
      imgColor: '/assets/images/icon-happy-color.svg',
      color: 'var(--other-green-300)',
      quotes: [
        "Happiness grows when it's shared with others.",
        'Celebrate even the small victories to make life extraordinary.',
        'Gratitude can turn what you have into enough.',
        'Keep smiling; your joy can be contagious.',
        'Where focus goes, energy flows - keep your focus on what lifts you.',
      ],
    },
    '0': {
      title: 'Neutral',
      img: '/assets/images/icon-neutral-white.svg',
      imgColor: '/assets/images/icon-neutral-color.svg',
      color: 'var(--other-blue-300)',
      quotes: [
        'A calm mind can find opportunity in every moment.',
        'Sometimes the greatest triumph is simply finding peace.',
        'Take a moment to breathe; every breath is a fresh start.',
        'Even an ordinary day can hold a pleasant surprise.',
        "Balance isn't found, it's created.",
      ],
    },
    '-1': {
      title: 'Sad',
      img: '/assets/images/icon-sad-white.svg',
      imgColor: '/assets/images/icon-sad-color.svg',
      color: 'var(--other-indigo-200)',
      quotes: [
        'Pain is temporary, brighter days lie ahead.',
        'Each setback is a chance to grow and learn.',
        'One small positive thought can change your entire day.',
        "It's okay to rest; self-care isn't selfish.",
        'Healing takes time - be patient and kind to yourself.',
      ],
    },
    '-2': {
      title: 'Very Sad',
      img: '/assets/images/icon-very-sad-white.svg',
      imgColor: '/assets/images/icon-very-sad-color.svg',
      color: 'var(--other-red-300)',
      quotes: [
        'You are stronger than you think; the storm will pass.',
        "It's okay to cry. Healing begins when you let your feelings flow.",
        'Even in darkness, a spark of hope can shine bright.',
        "This moment is tough, but you've overcome challenges before.",
        'A gentle step forward, no matter how small, is still progress.',
      ],
    },
  }

  const sleepMap = {
    '9': {
      height: '100%',
      title: '9+ hours',
    },
    '7.5': {
      height: '69%',
      title: '7-8 hours',
    },
    '5.5': {
      height: '51%',
      title: '5-6 hours',
    },
    '3.5': {
      height: '33%',
      title: '3-4 hours',
    },
    '1.5': {
      height: '17%',
      title: '0-2 hours',
    },
    '0': {
      height: '0px',
      title: null,
    },
  }

  return { moodMap, sleepMap }
}
