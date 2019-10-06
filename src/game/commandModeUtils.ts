interface Commands {
  jumpToLine(no: number): void;
  noMatch(): void;
}

export const calculateCommand = (str: string, commands: Commands) => {
  const lineNumber = parseInt(str);

  if (!isNaN(lineNumber)) {
    commands.jumpToLine(lineNumber);
  } else {
    commands.noMatch();
  }
};
