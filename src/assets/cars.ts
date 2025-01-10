import { Car } from 'models';

// Brand logos
import mazdaLogo from '/brands/mazda.png';
import mclaren from '/brands/mclaren.png';

// Mazda RX-7 1992
import rx7Image from '/rx7/rx7.jpg';
import rx7Model from '../../public/rx7/rx7';

// Mclaren P1
import p1Image from '/p1/p1.jpg';
import p1Model from '../../public/p1/p1';

export const cars: Car[] = [
  {
    name: 'Mazda RX-7 1992',
    imageSrc: rx7Image,
    brandLogoSrc: mazdaLogo,
    modelTsx: rx7Model,
    moreInformation: {
      manufacturer: 'Mazda',
      production: '1992-2002',
      assembly: 'Hiroshima, Japan',
      topSpeed: '250 km/h (155mph)',
      drag: '5.9 seconds',
      class: 'Sports Car',
      bodyStyle: '2-door Coupe',
      layout: 'Front-engine, Rear-wheel drive',
      engine: '1.3L Twin-Turbocharged Rotary (13B-REW)',
      powerOutput: '255 HP (190 kW) @ 6,500 RPM',
      transmission: '5-speed Manual',
      wheelbase: '2,426 mm (95.5 in)',
      length: '4,285 mm (168.7 in)',
      width: '1,760 mm (69.3 in)',
      height: '1,230 mm (48.4 in)',
      kerbWeight: '1,260 kg (2,778 lbs)',
      predecessor: 'Mazda RX-7 (FC)',
      successor: 'None',
    },
    colors: ['#000000', '#D92A2A', '#F5F5F5', '#9B1B30', '#1C3A5D'],
  },
  {
    name: 'Mclaren P1',
    imageSrc: p1Image,
    brandLogoSrc: mclaren,
    modelTsx: p1Model,
  },
];

export const bodyColors = ['red', 'blue', 'green', 'yellow'];
