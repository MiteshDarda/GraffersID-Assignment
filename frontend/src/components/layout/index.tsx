import { Outlet } from 'react-router';
import Button from '../ui/buttons/button';
import Input2 from '../ui/inputs/input2';
import SearchIcon from '@mui/icons-material/Search';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white p-4 px-16 shadow-lg">
        <div className="mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">Graffers-ID</div>

          <div className="flex gap-6 justify-center items-center">
            <div className="w-96">
              <Input2 icon={<SearchIcon sx={{ color: 'purple' }} />} placeholder="Search..." />
            </div>

            <Button type="button" variant="transparent" size="sm">
              SignUp
            </Button>

            <Button type="button" variant="transparent" size="sm">
              Login
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex-1 pt-24 w-full px-32 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
