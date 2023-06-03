export const capitalize = (word: string) => {
  if (word === "knh") return word.toUpperCase();

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

export const parseImageUrl = (imageName: string, entity: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${entity}/image/${imageName}`;
};
