import { FC } from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline'; // empty
import StarHalfIcon from '@mui/icons-material/StarHalf'; // half
import StarIcon from '@mui/icons-material/Star'; // star
import Button from '../../../components/ui/buttons/button';

interface ListCompaniesProps {
  companies: any[];
}

const ListCompanies: FC<ListCompaniesProps> = ({ companies }) => {
  const renderStars = (stars: number, reviewCount: number) => {
    if (stars === 0) return 'No rating yet';
    // stars out of 5
    return (
      <div className="flex items-center gap-1">
        <span>{stars.toFixed(1)}</span>
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= stars) {
            return <StarIcon key={star} className="text-yellow-500" />;
          } else if (star - stars < 1) {
            return <StarHalfIcon key={star} className="text-yellow-500" />;
          } else {
            return <StarOutlineIcon key={star} className="text-yellow-500" />;
          }
        })}
        <span className="text-gray-500 text-xs">({reviewCount})</span>
      </div>
    );
  };
  return (
    <>
      <div>
        {companies?.map((company: any) => (
          <div
            key={company._id}
            className="flex gap-4 mt-4 bg-white p-4 rounded-md shadow-md items-center">
            {/*//* Left Image / Company Logo ============================================================ */}
            <div>
              <img
                src="https://www.gravatar.com/avatar/"
                alt="company-logo"
                className="h-16 w-16 rounded-full"
              />
            </div>
            {/*//* Right Side / Content ============================================================ */}
            <div className="flex-col grow gap-4">
              {/*//* Line 1 ============================================================ */}
              <div className="flex justify-between items-center w-full">
                <h1 className="text-lg">Company: {company.name}</h1>
                <p className="text-gray-500 text-xs">
                  Founded on: {new Date(company.foundedOn).toLocaleDateString()}
                </p>
              </div>
              {/*//* Line 2 ============================================================ */}
              <div>
                <p className="text-gray-500">{company.location}</p>
              </div>
              {/*//* Line 3 ============================================================ */}
              <div className="flex  justify-between items-end">
                <div>{renderStars(company.avgRating, company.reviewCount)}</div>
                <div>
                  <Button size="sm" variant="ghost">
                    Detailed Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListCompanies;
