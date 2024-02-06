import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TAcademicSemester } from "./academiManagement.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TCreateResponse = {
  data: {
    data?: TAcademicSemester;
    success: boolean;
    message: string;
  };
  error?: TError;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
