import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => {
        return {
          url: "/academic-semesters",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllAcademicSemesterQuery } = academicSemesterApi;
