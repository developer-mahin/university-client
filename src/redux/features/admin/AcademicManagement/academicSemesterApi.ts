import { TResponseRedux } from "../../../../types";
import {
  TAcademicSemester,
  TQueryParams,
} from "../../../../types/academiManagement.types";
import { baseApi } from "../../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.forEach((item: TQueryParams) =>
          params.append(item.name, item.value as string)
        );

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        const data = response.data;
        const meta = response.meta;
        return {
          data,
          meta,
        };
      },
    }),

    createAcademicSemester: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-semesters/create-academic-semester",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
} = academicManagementApi;
