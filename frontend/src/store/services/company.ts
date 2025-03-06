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
    })
  })
});

export const {
  // Queries
  useGetCompaniesQuery,
  // Mutations
  useCreateCompanyMutation
} = companyApi;
