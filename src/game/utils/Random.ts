import { Colours, StringColours } from "../../constants/colours";
import { words } from "./words";

class Random {
  private static colours: Colours[] = [
    Colours.PINK,
    Colours.RED,
    Colours.YELLOW,
    Colours.BLUE,
    Colours.GREEN
  ];

  public static stringColours: StringColours[] = [
    StringColours.PINK,
    StringColours.RED,
    StringColours.YELLOW,
    StringColours.BLUE,
    StringColours.GREEN
  ];

  public static getNumber(max: number): number {
    return Math.round(Math.floor(Math.random() * Math.floor(max)));
  }

  public static getWords(): string[] {
    const index = Random.getNumber(words.length);
    return words[index];
  }

  public static randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

  public static getColour(): Colours {
    const index = Random.getNumber(this.colours.length);
    return this.colours[index];
  }

  public static getStringColour(): StringColours {
    const index = Random.getNumber(this.stringColours.length);
    return this.stringColours[index];
  }
}

export default Random;
