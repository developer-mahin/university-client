import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academiManagement.types";

export type TStudent = {
  _id: string;
  id: string;
  user: {
    _id: string;
    id: string;
    email: string;
    needsPasswordChange: boolean;
    role: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
    _id: string;
  };
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    _id: string;
  };

  localGuardian: {
    address: {
      village: string;
      city: string;
      home: string;
    };
    name: string;
    occupation: string;
    contactNo: string;
    _id: string;
  };
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  profileImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
};
