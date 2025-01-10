import { Car } from "models";

// Brand logos
import mazdaLogo from "/brands/mazda.png";

// Rx-7
import rx7Image from "/rx7/rx7.jpg";
import rx7Model from "../../public/rx7/rx7";

export const cars: Car[] = [
  {
    name: "Mazda RX-7 1992",
    imageSrc: rx7Image,
    brandLogoSrc: mazdaLogo,
    modelTsx: rx7Model,
  },
];

export const bodyColors = ["red", "blue", "green", "yellow"];
