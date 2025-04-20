// Import sound files
import clickSoundFile from '../assets/sounds/click.mp3';
import unclickSoundFile from '../assets/sounds/unclick.mp3';

let isMuted = false;

// Create Audio objects
const clickSound = new Audio(clickSoundFile);
const unclickSound = new Audio(unclickSoundFile);

// Set volume levels
clickSound.volume = 0.5;
unclickSound.volume = 0.5;

// Preload all sounds
const preloadSounds = () => {
  clickSound.load();
  unclickSound.load();
};

// Call preload on module load
preloadSounds();

export const playButtonClickSound = () => {
  if (!isMuted) {
    clickSound.currentTime = 0;
    clickSound.play().catch(error => {
      console.log('Sound playback failed:', error);
    });
  }
};

export const playPopupOpenSound = () => {
  if (!isMuted) {
    clickSound.currentTime = 0;
    clickSound.play().catch(error => {
      console.log('Sound playback failed:', error);
    });
  }
};

export const playPopupCloseSound = () => {
  if (!isMuted) {
    unclickSound.currentTime = 0;
    unclickSound.play().catch(error => {
      console.log('Sound playback failed:', error);
    });
  }
};

export const toggleMute = () => {
  isMuted = !isMuted;
  return isMuted;
};

export const getMuteState = () => isMuted; 