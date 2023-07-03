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
  dateAndTime: string;
  deliveryCharge: number;
  deliveryCompany: string;
};
