export const getWikiUrl = (digimonName: string) =>
  `https://wikimon.net/index.php?search=${encodeURIComponent(
    digimonName || 'unknown',
  )}&title=Special:Search&go=Go`;
