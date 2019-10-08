import { Images } from "./ImageLoader";

export enum Animations {
  VIMBOY_BOB = "VIMBOY_BOB",
  VIMBOY_WORD_ATTACK = "VIMBOY_WORD_ATTACK",
  VIMBOY_UP = "VIMBOY_UP",
  VIMBOY_DOWN = "VIMBOY_DOWN",
  VIMBOY_POP = "VIMBOY_POP"
}

export const loadAnimations = () => {
  window.scene.anims.create({
    key: Animations.VIMBOY_BOB,
    frames: window.scene.anims.generateFrameNumbers(Images.VIMBOY, {
      start: 0,
      end: 4
    }),
    frameRate: 10,
    repeat: -1
  });

  window.scene.anims.create({
    key: Animations.VIMBOY_WORD_ATTACK,
    frames: window.scene.anims.generateFrameNumbers(Images.VIMBOY, {
      frames: [5]
    }),
    frameRate: 10,
    repeat: 0
  });

  window.scene.anims.create({
    key: Animations.VIMBOY_UP,
    frames: window.scene.anims.generateFrameNumbers(Images.VIMBOY, {
      frames: [1, 2, 3]
    }),
    frameRate: 10,
    repeat: 0
  });

  window.scene.anims.create({
    key: Animations.VIMBOY_DOWN,
    frames: window.scene.anims.generateFrameNumbers(Images.VIMBOY, {
      frames: [6, 7, 8]
    }),
    frameRate: 10,
    repeat: 0
  });

  window.scene.anims.create({
    key: Animations.VIMBOY_POP,
    frames: window.scene.anims.generateFrameNumbers(Images.VIMBOY, {
      frames: [9]
    }),
    frameRate: 10,
    repeat: 0
  });
};
