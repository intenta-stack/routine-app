export type SoundType = 'beep' | 'click' | 'pop' | 'tone';

export const SOUND_LABELS: Record<SoundType, string> = {
  beep: 'ビープ音',
  click: 'クリック音',
  pop: 'ポップ音',
  tone: 'トーン音',
};

export const SOUND_ASSETS: Record<SoundType, ReturnType<typeof require>> = {
  beep: require('../assets/sounds/beep.wav'),
  click: require('../assets/sounds/click.wav'),
  pop: require('../assets/sounds/pop.wav'),
  tone: require('../assets/sounds/tone.wav'),
};
