import { Images, CLASH_START_FRAME, CLASH_FRAME_COUNT } from "./ImageLoader";

export enum Animations {
  VIMBOY_BOB = "VIMBOY_BOB",
  VIMBOY_WORD_ATTACK = "VIMBOY_WORD_ATTACK",
  VIMBOY_UP = "VIMBOY_UP",
  VIMBOY_DOWN = "VIMBOY_DOWN",
  VIMBOY_POP = "VIMBOY_POP",
  CLASH = "CLASH"
}

const createFrameConfig = (
  key: Animations,
  frameStart: number,
  frameCount: number,
  repeat: number = 0
) => ({
  key,
  frames: window.scene.anims.generateFrameNumbers(Images.VIMBOY, {
    frames: Array.from(Array(frameCount).keys()).map(k => frameStart + k)
  }),
  frameRate: 10,
  repeat
});

export const loadAnimations = () => {
  window.scene.anims.create(createFrameConfig(Animations.VIMBOY_BOB, 0, 5, -1));

  window.scene.anims.create(
    createFrameConfig(Animations.VIMBOY_WORD_ATTACK, 5, 1)
  );

  window.scene.anims.create(createFrameConfig(Animations.VIMBOY_UP, 1, 3));

  window.scene.anims.create(createFrameConfig(Animations.VIMBOY_DOWN, 6, 3));

  window.scene.anims.create(createFrameConfig(Animations.VIMBOY_POP, 9, 1));

  window.scene.anims.create(
    createFrameConfig(Animations.CLASH, CLASH_START_FRAME, CLASH_FRAME_COUNT)
  );
};
