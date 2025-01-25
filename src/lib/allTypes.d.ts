interface ISignUpdata {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
}
interface ILoginData {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  userType: string;
}

interface ITranscript {
  [key: string]: string;
  status: string;
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  course: string;
  graduationYear: string;
  institution: string;
  address: string;
  zipCode: string;
  destination: string;
  destinationNumber: string;
  city: string;
  matricNo: string;
  amount: string;
  email: string;
  date: string;
  requester: string;
  transcriptId: string;
  __v: number;
  updatedBy: string;
}

interface IEducation {
  [key: string]: string;
  status: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  instituteCharge: number;
  date?: string;
  ourCharge: number;
  requester: string;
  certImage: string;
  institution?: string;
  __v: number;
}

interface IAdmin {
  userType: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Institution {
  _id: string;
  name: string;
  ourCharge: string;
  instituteCharge: string;
  transcriptFee: string;
  country: string;
  __v: number;
}
