import { calculateCommand } from "./commandModeUtils";

const commands = {
  jumpToLine: () => undefined,
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
});
