interface Commands {
  jumpToLine(no: number): void;
  jumpBackNLines(no: number): void;
  noMatch(): void;
}

export const calculateCommand = (str: string, commands: Commands) => {
  const lineNumber = parseInt(str);

  if (isNaN(lineNumber)) {
    commands.noMatch();
    return;
  }

  if (lineNumber >= 0) {
    commands.jumpToLine(lineNumber);
    return;
  }

  if (lineNumber < 0) {
    commands.jumpBackNLines(-lineNumber);
    return;
  }
};
