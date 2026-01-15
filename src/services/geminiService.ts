const creativeFragments = [
  'We treat every pixel as a building block for quiet revolutions.',
  'Crafting atmospheres where luxury feels like restraint, not noise.',
  'Designing experiences that breathe—minimal, intentional, alive.',
  'We sculpt digital spaces that balance brutal honesty with elegance.',
  'Every interaction is tuned like a piece of chamber music for the web.',
];

export const generateCreativeBio = async (themes: string[]): Promise<string> => {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const fragment = creativeFragments[Math.floor(Math.random() * creativeFragments.length)];

  return new Promise((resolve) => {
    setTimeout(() => resolve(`${fragment} Currently obsessed with ${theme}.`), 400);
  });
};
