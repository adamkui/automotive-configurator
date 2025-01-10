import { Vector3 } from '@react-three/fiber';

export type Car = {
  name: string;
  imageSrc: string;
  brandLogoSrc: string;
  modelTsx: (props: any) => JSX.Element;
  moreInformation?: MoreInformation;
  colors?: CarColor[];
  annotations?: AnnotationData[];
};

export type MoreInformation = {
  manufacturer: string;
  production: string;
  assembly: string;
  topSpeed: string;
  drag: string;
  class: string;
  bodyStyle: string;
  layout: string;
  engine: string;
  powerOutput: string;
  transmission: string;
  wheelbase: string;
  length: string;
  width: string;
  height: string;
  kerbWeight: string;
  predecessor: string;
  successor: string;
};

export type CarColor = {
  name: string;
  hexCode: string;
};

export type AnnotationData = {
  index: number;
  label: string;
  description: string;
  position: { x: number; y: number; z: number };
};
