import { TResponseRedux } from "../../../types";
import { TAcademicFaculty } from "../../../types/academiManagement.types";
import { baseApi } from "../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-faculties/create-academic-faculty",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAcademicFaculties: builder.query({
      query: () => {
        return {
          url: "/academic-faculties",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        const data = response.data;
        const meta = response.meta;
        return {
          data,
          meta,
        };
      },
    }),
  }),
});

export const {
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
} = academicFacultyApi;
