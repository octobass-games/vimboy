import { calculateCommand } from "./commandModeUtils";

const commands = {
  jumpToLine: () => undefined,
  jumpBackNLines: () => undefined,
  noMatch: () => undefined
};

describe("calculateCommand", () => {
  it("should handle no match", () => {
    const noMatch = jest.fn();

    calculateCommand("helpme", {
      ...commands,
      noMatch
    });

    expect(noMatch).toHaveBeenCalled();
  });

  it("should handle jump to line", () => {
    const jumpToLine = jest.fn();

    calculateCommand("123", {
      ...commands,
      jumpToLine
    });

    expect(jumpToLine).toHaveBeenCalledWith(123);
  });

  it("should handle jump to minus line", () => {
    const jumpBackNLines = jest.fn();

    calculateCommand("-123", {
      ...commands,
      jumpBackNLines
    });

    expect(jumpBackNLines).toHaveBeenCalledWith(123);
  });
});
