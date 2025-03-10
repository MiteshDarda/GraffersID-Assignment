import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
const Layout = lazy(() => import('./components/layout'));
const Home = lazy(() => import('./pages/home'));
const DetailedReview = lazy(() => import('./pages/detailed-review'));

function App() {
  return (
    <div className="roboto w-screen overflow-x-hidden max-w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:companyId/detailedReview" element={<DetailedReview />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
