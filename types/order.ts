export interface IOrder {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  data: {
    date: string;
    user: string;
    orders: {
      orderId: string;
      orderItems: OrderItem[];
    }[];
  }[];
}

export interface OrderItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  shopName: string;
  shopId: string;
  order: {
    id: string;
    orderId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      image: {
        id: string;
        public_id: string;
        secure_url: string;
      };
    };
  };
  product: {
    id: string;
    title: string;
    images: { id: string; secure_url: string }[];
  };
}
