export type Car = {
  name: string;
  imageSrc: string;
  brandLogoSrc: string;
  modelTsx: (props: any) => JSX.Element;
};
