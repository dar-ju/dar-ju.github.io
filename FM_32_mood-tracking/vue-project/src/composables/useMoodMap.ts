export const useMoodMap = () => {
  const moodMap = {
    '2': {
      title: 'Very Happy',
      img: '/assets/images/icon-very-happy-white.svg',
      imgColor: '/assets/images/icon-very-happy-color.svg',
      color: 'var(--other-amber-300)',
    },
    '1': {
      title: 'Happy',
      img: '/assets/images/icon-happy-white.svg',
      imgColor: '/assets/images/icon-happy-color.svg',
      color: 'var(--other-green-300)',
    },
    '0': {
      title: 'Neutral',
      img: '/assets/images/icon-neutral-white.svg',
      imgColor: '/assets/images/icon-neutral-color.svg',
      color: 'var(--other-blue-300)',
    },
    '-1': {
      title: 'Sad',
      img: '/assets/images/icon-sad-white.svg',
      imgColor: '/assets/images/icon-sad-color.svg',
      color: 'var(--other-indigo-200)',
    },
    '-2': {
      title: 'Very Sad',
      img: '/assets/images/icon-very-sad-white.svg',
      imgColor: '/assets/images/icon-very-sad-color.svg',
      color: 'var(--other-red-300)',
    },
  }

  const sleepMap = {
    '9': {
      height: '100%',
      title: '9+ hours',
    },
    '7.5': {
      height: '68%',
      title: '7-8 hours',
    },
    '5.5': {
      height: '51%',
      title: '5-6 hours',
    },
    '3.5': {
      height: '34%',
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
