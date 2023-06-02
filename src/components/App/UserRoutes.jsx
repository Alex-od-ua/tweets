import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const TweetsPage = lazy(() => import('../../pages/TweetsPage/TweetsPage'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/tweets" element={<TweetsPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;