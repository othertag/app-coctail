import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  cocktailsStore,
  fetchCocktailsFx,
  $error,
} from '@features/cocktails/model';
import { Loader } from '@shared/ui/Loader';
import { ErrorMessage } from '@shared/ui/ErrorMessage';

export const CocktailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  console.log('code', code);
  const cocktails = useStore(cocktailsStore);
  const error = useStore($error);
  const isLoading = useStore(fetchCocktailsFx.pending);

  useEffect(() => {
    if (code) {
      // Загружаем коктейли по коду
      fetchCocktailsFx(code);
    }
  }, [code]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!cocktails?.length) {
    return <div>Нет данных по коктейлю: {code}</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      {cocktails.map((cocktail) => (
        <div key={cocktail.idDrink} style={{ marginBottom: '2rem' }}>
          <h2>{cocktail.strDrink}</h2>
          <div>
            <strong>Category:</strong> {cocktail.strCategory}
          </div>
          <div>
            <strong>Alcoholic:</strong> {cocktail.strAlcoholic}
          </div>
          <div>
            <strong>Glass:</strong> {cocktail.strGlass}
          </div>
          <div>
            <strong>Instructions:</strong> {cocktail.strInstructions}
          </div>
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            loading="lazy" /* Lazy-loading для картинки */
            style={{ maxWidth: '300px', marginTop: '1rem' }}
          />

          <div style={{ marginTop: '1rem' }}>
            <strong>List of ingredients:</strong>
            <ul>
              {Array.from({ length: 15 }, (_, i) => i + 1)
                .map((i) => {
                  const ingredient = (cocktail as any)[`strIngredient${i}`];
                  const measure = (cocktail as any)[`strMeasure${i}`];

                  if (!ingredient) {
                    return null;
                  }

                  return (
                    <li key={i}>
                      {measure} {ingredient}
                    </li>
                  );
                })
                .filter(Boolean)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
