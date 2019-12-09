export enum Sound {
  MUSIC = "music",
  BAD = "bad",
  GOOD = "good",
  DEATH = "death",
  GOOD_SCORE = "good-score",
  BOOP = "boop"
}

const url = (name: string) =>
  `https://storage.googleapis.com/octobass-vimboy/sounds/${name}.wav`;

const preloadSounds = () => {
  window.scene.load.audio(Sound.MUSIC, [url("vimboy-theme")]);
  window.scene.load.audio(Sound.BAD, [url("bad")]);
  window.scene.load.audio(Sound.DEATH, [url("death")]);
  window.scene.load.audio(Sound.GOOD, [url("good")]);
  window.scene.load.audio(Sound.BOOP, [url("boop")]);
  window.scene.load.audio(Sound.GOOD_SCORE, [url("good-score")]);
};

export default preloadSounds;
