export interface IDeliveryCompany {
  id: string;
  name: string;
  slug: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  whatsappNumber: string;
  images: {
    id: string;
    name: string;
  }[];
}
