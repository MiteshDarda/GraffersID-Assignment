import { api } from './api';

const prefixUrl = '/company';
const companyApi = api.injectEndpoints({
  endpoints: (build) => ({
    //? Get all the Companies ================================================================================================================
    getCompanies: build.query({
      query: ({
        state = '',
        page = 1,
        limit = 10
      }: {
        state?: string;
        page?: number;
        limit?: number;
      }) => {
        return {
          url: prefixUrl,
          params: { state, page, limit }
        };
      },
      providesTags: ['Company']
    }),
    //? Get all the reviews of a company =======================================================================================================
    getCompanyReviews: build.query({
      query: (companyId: number) => `${prefixUrl}/${companyId}/review`,
      providesTags: ['Company']
    }),
    //? Create a new company ===============================================================================================================
    createCompany: build.mutation({
      query: ({
        companyName = '',
        state = '',
        location = '',
        foundedOn = ''
      }: {
        companyName?: string;
        state?: string;
        location?: string;
        foundedOn?: string;
      }) => {
        return {
          url: prefixUrl,
          method: 'POST',
          body: {
            name: companyName,
            state,
            location,
            foundedOn
          }
        };
      },
      invalidatesTags: ['Company']
    }),
    //? Create a new review for a company ===============================================================================================================
    createCompanyReview: build.mutation({
      query: ({
        companyId,
        rating,
        review,
        fullName,
        subject
      }: {
        companyId: number;
        rating: number;
        review: string;
        fullName: string;
        subject: string;
      }) => {
        return {
          url: `${prefixUrl}/${companyId}/review`,
          method: 'POST',
          body: {
            rating,
            review,
            fullName,
            subject
          }
        };
      },
      invalidatesTags: ['Company']
    })
    //?  ===============================================================================================================
  })
});

export const {
  // Queries
  useGetCompaniesQuery,
  useGetCompanyReviewsQuery,
  // Mutations
  useCreateCompanyMutation,
  useCreateCompanyReviewMutation
} = companyApi;
