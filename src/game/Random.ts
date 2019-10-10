import { Colours } from "../constants/colours";

class Random {
  private static words: string[] = [
    "console.log('Hello, World!')",
    "const fn = () => {}",
    "class Pizza {}"
  ];

  public static getNumber(max: number): number {
    return Math.round(Math.floor(Math.random() * Math.floor(max)));
  }

  public static getWord(): string {
    const index = Random.getNumber(Random.words.length);
    return Random.words[index];
  }

  public static getColour(): Colours {
    const index = Random.getNumber(Object.values(Colours).length);
    return Object.values(Colours)[index] as Colours;
  }
}

export default Random;
