import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { useSettings } from '../context/SettingsContext';
import { SOUND_ASSETS, SoundType } from '../constants/sounds';

// Pre-load all players at hook level to avoid reload on soundType change
function useAllPlayers() {
  const beep = useAudioPlayer(SOUND_ASSETS['beep']);
  const click = useAudioPlayer(SOUND_ASSETS['click']);
  const pop = useAudioPlayer(SOUND_ASSETS['pop']);
  const tone = useAudioPlayer(SOUND_ASSETS['tone']);
  return { beep, click, pop, tone };
}

export function useFeedback() {
  const { settings } = useSettings();
  const players = useAllPlayers();

  const triggerFeedback = async () => {
    if (settings.hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (settings.soundEnabled) {
      const player = players[settings.soundType as SoundType];
      player.volume = settings.volume;
      await player.seekTo(0);
      player.play();
    }
  };

  return { triggerFeedback };
}
