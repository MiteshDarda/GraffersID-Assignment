import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  useCreateCompanyReviewMutation,
  useGetCompanyReviewsQuery
} from '../../store/services/company';
import StarOutlineIcon from '@mui/icons-material/StarOutline'; // empty
import StarHalfIcon from '@mui/icons-material/StarHalf'; // half
import StarIcon from '@mui/icons-material/Star'; // star
import Button from '../../components/ui/buttons/button';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const renderStars = (
  stars: number = 0,
  reviewCount: number = 0,
  showReviewCount: boolean = true
) => {
  if (stars === 0) return <span className="text-gray-500 text-xs">(No rating yet)</span>;
  // stars out of 5
  return (
    <div className="flex items-center gap-1 justify-center">
      <span
        className={`text-yellow-500 ${
          stars > 3.5 ? 'font-bold' : stars > 2.5 ? 'font-medium' : 'font-normal'
        }`}>
        {stars.toFixed(1)}
      </span>
      <div>
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= stars) {
            return <StarIcon key={star} className="text-yellow-500" />;
          } else if (star - stars < 1) {
            return <StarHalfIcon key={star} className="text-yellow-500" />;
          } else {
            return <StarOutlineIcon key={star} className="text-yellow-500" />;
          }
        })}
      </div>
      {showReviewCount && <span className="text-gray-500 text-xs">({reviewCount})</span>}
    </div>
  );
};

const DetailedReview: FC = () => {
  const params = useParams();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reviewCount, setReviewCount] = useState<number | null>(0);
  const [company, setCompany] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
    fullName: '',
    subject: ''
  });

  //* APIS ========================================================================================
  const {
    data: reviewsRes
    // isLoading: reviewsLoading,
    // error: reviewsError
  } = useGetCompanyReviewsQuery(params.companyId ? Number(params.companyId) : 0, {
    skip: !params.companyId
  });

  const [
    createCompanyReview,
    { isLoading: createCompanyReviewLoading, data: createCompanyReviewData }
  ] = useCreateCompanyReviewMutation();

  //* Handle Modal Close ========================================================================================
  const handleModalClose = () => setOpenModal(false);

  //* Form Submit Handler ========================================================================================
  const submitHandler = (e: any) => {
    e.preventDefault();
    // check if all fields are filled
    if (!formData.fullName || !formData.rating || !formData.review || !formData.subject) {
      return;
    }
    createCompanyReview({
      companyId: Number(companyId),
      rating: formData.rating,
      review: formData.review,
      fullName: formData.fullName,
      subject: formData.subject
    });
  };

  //* useEffect: set company id ========================================================================================
  useEffect(() => {
    if (params.companyId) {
      setCompanyId(params.companyId || null);
    }
  }, [params]);

  //* useEffect : data initialize ========================================================================================
  useEffect(() => {
    console.log(reviewsRes);
    if (reviewsRes) {
      setReviewCount(reviewsRes?.data?.totalReview);
      setCompany(reviewsRes?.data?.company);
      setReviews(reviewsRes?.data?.reviews);
    }
  }, [reviewsRes]);

  useEffect(() => {
    if (createCompanyReviewData) {
      // Reset and close
      setFormData({ rating: 0, review: '', fullName: '', subject: '' });
      setOpenModal(false);
    }
  }, [createCompanyReviewData]);

  return (
    <>
      <div>
        <hr className="text-gray-200 mb-4" />
        <div className="bg-white p-4 rounded-md shadow-xl">
          {/*//? Company Section ============================================================ */}
          <div className=" flex gap-4">
            {/*//? Company ============================================================ */}
            <div>
              <img
                src="https://www.gravatar.com/avatar/"
                alt="company-logo"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div className="flex-col grow gap-4">
              {/*//* Line 1 ============================================================ */}
              <div className="flex justify-between items-center w-full">
                <h1 className="text-lg">Company: {company?.name}</h1>
                <p className="text-gray-500 text-xs">
                  Founded on: {new Date(company?.foundedOn).toLocaleDateString()}
                </p>
              </div>
              {/*//* Line 2 ============================================================ */}
              <div>
                <p className="text-gray-500">{company?.location}</p>
              </div>
              {/*//* Line 3 ============================================================ */}
              <div className="flex  justify-between items-end">
                <div>{renderStars(company?.avgRating, company?.reviewCount)}</div>
                <div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setOpenModal(true);
                    }}>
                    Add Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <hr className="text-gray-200 my-4" />
          {/*//? Reviews Section ============================================================ */}
          <div className="mt-4 text-gray-500 text-xs p-2">
            <span>Results found: {reviewCount}</span>
            <div>
              {reviews?.map((review) => (
                <>
                  <div key={review.id} className="bg-gray-100 p-2 rounded-md my-2">
                    <div className="flex justify-between items-center">
                      <div>{review?.fullName}</div>
                      <div className="flex gap-2">{renderStars(review?.rating, 0, false)}</div>
                      <span className="text-xs">
                        {new Date(review?.createDateTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <p className="text-base text-black">{review?.review}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div
          className="h-[85vh] w-[300px] p-4 pt-6 bg-white relative"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            borderRadius: '18px',
            height: 'contents'
          }}>
          <div
            onClick={handleModalClose}
            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700">
            <CloseIcon
              fontSize="small"
              sx={{
                color: 'gray'
              }}
            />
          </div>
          <h1 className="text-2xl text-center">Add Review</h1>
          <form
            className="flex-col gap-8 justify-between items-center mt-8 h-full w-full"
            onSubmit={submitHandler}>
            {/* fullName, subject, review, rating, */}
            <div className=" h-[19%] flex-col gap-4">
              <label className="text-gray-400 text-sm">Full Name:</label>
              <div className="">
                <input
                  required={true}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className=" h-[19%] flex-col gap-4">
              <label className="text-gray-400 text-sm">Subject:</label>
              <div className="">
                <input
                  required={true}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className=" h-[19%] flex-col gap-4">
              <label className="text-gray-400 text-sm">Rating:</label>
              <div className="">
                <input
                  required={true}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Rating"
                  value={formData.rating}
                  onChange={(e) => {
                    if (Number(e.target.value) > 5) return;
                    setFormData({ ...formData, rating: Number(e.target.value) });
                  }}
                />
              </div>
            </div>
            <div className=" h-[19%] flex-col gap-4">
              <label className="text-gray-400 text-sm">Review:</label>
              <div className="">
                <input
                  required={true}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Review"
                  value={formData.review}
                  onChange={(e) => {
                    setFormData({ ...formData, review: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* Button */}
            <div className="flex justify-center h-[19%]">
              <Button
                type="submit"
                size="md"
                variant="primary"
                onClick={submitHandler}
                isLoading={createCompanyReviewLoading}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DetailedReview;
