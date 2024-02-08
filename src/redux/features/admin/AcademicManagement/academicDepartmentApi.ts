import { TResponseRedux } from "../../../../types";
import { TAcademicDepartment } from "../../../../types/academiManagement.types";
import { baseApi } from "../../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicDepartment: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-departments/create-academic-department",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-departments",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
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
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicDepartmentApi;
