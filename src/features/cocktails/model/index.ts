import { createStore, createEffect, createEvent } from 'effector';
import { getCocktails } from '../lib/api';
import { Cocktail } from '@entities/cocktail/types/cocktail';

export const fetchCocktailsFx = createEffect<string, Cocktail[], string>();
export const resetCocktails = createEvent();

export const cocktailsStore = createStore<Cocktail[]>([])
  .on(fetchCocktailsFx.doneData, (_, payload) => payload)
  .reset(resetCocktails);

export const $error = createStore<string | null>(null)
  .on(fetchCocktailsFx.failData, (_, error) => error)
  .reset([resetCocktails, fetchCocktailsFx.doneData]);

fetchCocktailsFx.use(async (code) => {
  const data = await getCocktails(code);
  return data;
});
