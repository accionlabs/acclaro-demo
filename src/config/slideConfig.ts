// Configuration for SVG slide dimensions
// Adjust svgAreaHeight, svgX, and svgY for each slide as needed
// svgAreaHeight should not exceed ~500px to fit within the 720px slide (accounting for padding and 80px header)

export interface SlideConfig {
  svgAreaHeight: number; // Height in pixels for the SVG container area
  svgX: number;          // Left offset in pixels for the SVG
  svgY: number;          // Top offset in pixels for the SVG
}

export const slideConfigs: Record<string, SlideConfig> = {
  slide03: {
    svgAreaHeight: 500,
    svgX: 0,
    svgY: 0,
  },
  slide04: {
    svgAreaHeight: 700,
    svgX: 120,
    svgY: -120,
  },
  slide05: {
    svgAreaHeight: 650,
    svgX: 0,
    svgY: -40,
  },
  slide06: {
    svgAreaHeight: 600,
    svgX: 0,
    svgY: -40,
  },
  slide07: {
    svgAreaHeight: 900,
    svgX: 0,
    svgY: -40,
  },
  slide08: {
    svgAreaHeight: 700,
    svgX: 70,
    svgY: -120,
  },
  slide09: {
    svgAreaHeight: 500,
    svgX: 0,
    svgY: 0,
  },
};

// Default configuration if slide not specified
export const defaultSlideConfig: SlideConfig = {
  svgAreaHeight: 500,
  svgX: 0,
  svgY: 0,
};
