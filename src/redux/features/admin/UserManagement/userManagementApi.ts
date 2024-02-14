import { TResponseRedux, TStudent } from "../../../../types";
import { TQueryParams } from "../../../../types/academiManagement.types";
import { baseApi } from "../../../api/baseApi";

const userManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item: TQueryParams) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        const data = response.data;
        const meta = response.meta;

        return {
          data,
          meta,
        };
      },
    }),

    createStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-students",
          method: "POST",
          body: data,
        };
      },
    }),
    
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
        };
      },
    }),

    getStudentDetails: builder.query({
      query: (args) => {
        return {
          url: `/students/${args}`,
          method: "GET",
        };
      },
    }),

    getAllFaculties: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetAllFacultiesQuery,
  useGetStudentDetailsQuery,
  useChangePasswordMutation
} = userManagement;
