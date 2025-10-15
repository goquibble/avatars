export const queryParams: Array<{
  param: string;
  default: string;
  description: string;
}> = [
  {
    param: "seed",
    default: `"guest"`,
    description: "For consistent seed.",
  },
  {
    param: "color",
    default: "None (based on seed)",
    description: "Color of the body.",
  },
  {
    param: "expression",
    default: "None (based on seed)",
    description: "Expression for the avatar.",
  },
];

export const expressions: Array<string> = [
  "smile",
  "surprise",
  "shh",
  "shock",
  "eww",
  "cool",
  "dead",
  "stars",
  "inlove",
  "rizz",
];
