import { Link, useNavigate } from 'react-router';
import BreadcrumbType from '../../../types/BreadcrumbType';
import { BackIcon, GreaterThanArrowIcon } from '../../icons';
import Tooltip from '../tooltip';

const BreadCrumbs = ({ breadcrumbs }: { breadcrumbs: BreadcrumbType[] }) => {
  // Sort breadcrumbs by level in descending order to get correct hierarchy
  const navigate = useNavigate();
  const sortedBreadcrumbs = [...breadcrumbs].sort((a, b) => b.level - a.level);
  const fallbackPath = '/';

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // If no history, go to fallback path
      navigate(fallbackPath);
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm p-2 px-4 rounded-lg bg-gray-100 h-[42px] overflow-y-hidden overflow-x-auto w-fit max-w-full">
      <span className="cursor-pointer" onClick={handleBack} aria-label="Back">
        <BackIcon />
      </span>
      {sortedBreadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.id} className="flex items-center h-[24px] w-full">
          {index !== 0 && (
            <span className="mx-2 text-black flex items-center justify-center" aria-hidden="true">
              {/* &gt; */}
              <GreaterThanArrowIcon />
            </span>
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="h-[24px] overflow-hidden w-full grow">
              <Tooltip text={breadcrumb.title}>{breadcrumb.title}</Tooltip>
            </span>
          ) : (
            <Link
              to={`/todo/${breadcrumb.id}`}
              className="text-primary-300 hover:text-black p-1 rounded-lg underline h-[24px] overflow-hidden w-full min-w-[100px]">
              <Tooltip text={breadcrumb.title}>{breadcrumb.title}</Tooltip>
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
