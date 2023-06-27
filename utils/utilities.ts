export const capitalize = (word: string) => {
  if (word === "knh_valco") return "KNH/Valco";

  return word
    .split("_")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
};

export const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
  });
};

const BASE_URL = "https://api.mimallgh.com";

export const parseProductImageUrl = (imageName: string) => {
  return `${BASE_URL}/products/image/${imageName}`;
};

export const parseShopImageUrl = (imageName: string) => {
  return `${BASE_URL}/shops/image/${imageName}`;
};

export const parseDeliveryImageUrl = (imageName: string) => {
  return `${BASE_URL}/delivery-companies/image/${imageName}`;
};
