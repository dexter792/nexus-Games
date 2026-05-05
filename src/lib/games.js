import gamesDataRaw from '../data/games.json';

export const gamesData = Array.isArray(gamesDataRaw) ? gamesDataRaw : [];

export const getCategories = (data) => {
  if (!data || !Array.isArray(data)) return [];
  const cats = data.map(g => g.category);
  return Array.from(new Set(cats));
};

export const filterGames = (data, query, category) => {
  if (!data || !Array.isArray(data)) return [];
  return data.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(query.toLowerCase()) ||
                          game.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || game.category === category;
    return matchesSearch && matchesCategory;
  });
};
