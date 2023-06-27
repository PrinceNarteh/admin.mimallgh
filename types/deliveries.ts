export type Delivery = {
  id: string;
  request: string;
  from: string;
  to: string;
  otherDetails?: string;
  alternatePhoneNumber?: string;
  fullName: string;
  phoneNumber: string;
  location: string;
  time: string;
  date: string;
  deliveryCharge: number;
  deliveryCompany: string;
};
