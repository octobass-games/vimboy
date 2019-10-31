export enum Verb {
  d = "d"
}

export enum Noun {
  w = "w",
  d = "d"
}

export const VERB_WORDS: Record<Verb, string> = {
  [Verb.d]: "Delete"
};

export const NOUN_WORDS: Record<Noun, string> = {
  [Noun.w]: "Word",
  [Noun.d]: "Line" // wtf vim
};
