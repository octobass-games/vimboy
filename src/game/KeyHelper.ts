export const isKeyPressed = (key: Phaser.Input.Keyboard.Key): boolean =>
  window.scene.input.keyboard.checkDown(key, 500);

export const onKeyCombo = (
  keyCombo: Phaser.Input.Keyboard.KeyCombo,
  cb: () => void
) =>
  window.scene.input.keyboard.on(
    "keycombomatch",
    (actualKeyCombo: any, keyboardEvent: any) => {
      if (actualKeyCombo === keyCombo) {
        cb();
      }
    }
  );

export const COMBO_DEFAULTS = {
  resetOnMatch: true,
  resetOnWrongKey: true
};
// TODO: capital letter files should not be so
