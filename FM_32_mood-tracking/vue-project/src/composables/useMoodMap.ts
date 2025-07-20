export const useMoodMap = () => {
  const moodMap = {
    '2': {
      title: 'Very Happy',
      img: '/assets/images/icon-very-happy-white.svg',
      color: 'var(--other-amber-300)',
    },
    '1': {
      title: 'Happy',
      img: '/assets/images/icon-happy-white.svg',
      color: 'var(--other-green-300)',
    },
    '0': {
      title: 'Neutral',
      img: '/assets/images/icon-neutral-white.svg',
      color: 'var(--other-blue-300)',
    },
    '-1': {
      title: 'Sad',
      img: '/assets/images/icon-sad-white.svg',
      color: 'var(--other-indigo-200)',
    },
    '-2': {
      title: 'Very Sad',
      img: '/assets/images/icon-very-sad-white.svg',
      color: 'var(--other-red-300)',
    },
  }

  const sleepMap = {
    '9': '100%',
    '7.5': '214px',
    '5.5': '165px',
    '3.5': '104px',
    '1.5': '50px',
    '0': '0px',
  }

  return { moodMap, sleepMap }
}
