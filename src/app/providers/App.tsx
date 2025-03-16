import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '@widgets/navigation/ui/Navigation';
import { CocktailPage } from '@pages/cocktail-page';
import { NotFoundPage } from '@pages/not-found';


const codes = ['margarita', 'mojito', 'a1', 'kir'] as const;

export function App() {
  return (
    <div style={{ maxWidth: 1024, margin: '0 auto' }}>
      <Navigation codes={codes} />

      <Routes>
        <Route path='/app-coctail/' element={<Navigate to={`/app-coctail/${codes[0]}`} replace />} />

        <Route path={`/app-coctail/:code`} element={<CocktailPage />} />
        <Route path="/app-coctail/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
