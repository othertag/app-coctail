import { Cocktail } from '@entities/cocktail/types/cocktail';

export async function getCocktails(code: string): Promise<Cocktail[]> {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка при запросе: ${response.status}`);
  }

  const result = await response.json();

  return result.drinks || [];
}
