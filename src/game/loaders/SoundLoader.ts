export enum Sound {
  MUSIC = "music",
  BAD = "bad",
  GOOD = "good",
  DEATH = "death",
  GOOD_SCORE = "good-score",
  BOOP = "boop"
}

const preloadSounds = () => {
  window.scene.load.audio(Sound.MUSIC, ["/sounds/vimboy-theme.wav"]);
  window.scene.load.audio(Sound.BAD, ["/sounds/bad.wav"]);
  window.scene.load.audio(Sound.DEATH, ["/sounds/death.wav"]);
  window.scene.load.audio(Sound.GOOD, ["/sounds/good.wav"]);
  window.scene.load.audio(Sound.BOOP, ["/sounds/boop.wav"]);
  window.scene.load.audio(Sound.GOOD_SCORE, ["/sounds/good-score.wav"]);
};

export default preloadSounds;
