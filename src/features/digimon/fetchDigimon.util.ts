export const fetchDigimonById = async (id: number) => {
  const response = await fetch(`https://digimon-api.com/api/v1/digimon/${id}`);
  const digimon = await response.json();
  return digimon;
};
