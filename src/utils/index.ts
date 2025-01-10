export const getCarPathname = (carName: string) => {
  return `/${carName.toLowerCase().replace(/ /g, "-")}`;
};
