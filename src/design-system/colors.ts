export type ShadeKey = "100" | "200" | "300" | "400" | "500" | "600" | "700";

export type ColorScale = Record<ShadeKey, string>;

export interface ColorCategories {
  base: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
  };
  primary: ColorScale;
  secondary: ColorScale;
  accentCool: ColorScale;
  accentWarm: ColorScale;
  info: ColorScale;
  error: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  disabled: ColorScale;
}

export const colors: ColorCategories = {
  base: {
    100: "#f0f0f0",
    200: "#dcdee0",
    300: "#a9aeb1",
    400: "#71767a",
    500: "#565c65",
    600: "#3d4551",
    700: "#1b1b1b",
  },
  primary: {
    100: "#d9e8f6",
    200: "#73b3e7",
    300: "#005ea2",
    400: "#0050d8",
    500: "#0050d8",
    600: "#1a4480",
    700: "#162e51",
  },
  secondary: {
    100: "#f8dfe2",
    200: "#f4856b",
    300: "#ed5530",
    400: "#fd4518",
    500: "#d13d19",
    600: "#a82202",
    700: "#a82202",
  },
  accentCool: {
    100: "#e1f3f8",
    200: "#97d4ea",
    300: "#00bde3",
    400: "#28a0cb",
    500: "#07648d",
    600: "#07648d",
    700: "#07648d",
  },
  accentWarm: {
    100: "#f2e4d4",
    200: "#ffbc78",
    300: "#fa9441",
    400: "#c05600",
    500: "#775540",
    600: "#775540",
    700: "#775540",
  },
  info: {
    100: "#e7f6f8",
    200: "#99deea",
    300: "#00bde3",
    400: "#009ec1",
    500: "#2e6276",
    600: "#2e6276",
    700: "#2e6276",
  },
  error: {
    100: "#f4e3db",
    200: "#f39268",
    300: "#d54309",
    400: "#b50909",
    500: "#6f3331",
    600: "#6f3331",
    700: "#6f3331",
  },
  warning: {
    100: "#faf3d1",
    200: "#fee685",
    300: "#ffbe2e",
    400: "#e5a000",
    500: "#936f38",
    600: "#936f38",
    700: "#936f38",
  },
  success: {
    100: "#ecf3ec",
    200: "#70e17b",
    300: "#00a91c",
    400: "#4d8055",
    500: "#446443",
    600: "#446443",
    700: "#446443",
  },
  disabled: {
    100: "#e6e6e6",
    200: "#c9c9c9",
    300: "#adadad",
    400: "#adadad",
    500: "#adadad",
    600: "#adadad",
    700: "#adadad",
  },
};

export function toCssVariables(prefix = "pier") {
  const lines: string[] = [];
  (Object.keys(colors) as Array<keyof ColorCategories>).forEach((category) => {
    const scale = (colors as any)[category] as Record<string, string>;
    Object.keys(scale).forEach((shade) => {
      const value = scale[shade] || "";
      lines.push(`--${prefix}-${category}-${shade}: ${value};`);
    });
  });
  return lines.join("\n");
}

export default colors;
