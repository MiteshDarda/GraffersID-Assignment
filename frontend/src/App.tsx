import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
const Layout = lazy(() => import('./components/layout'));
const Home = lazy(() => import('./pages/home'));

function App() {
  return (
    <div className="roboto w-screen overflow-x-hidden max-w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<GeneralTodos />} />
            <Route path="/todo/:id" element={<Todo />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/calender/:id" element={<Todo />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
