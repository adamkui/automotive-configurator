import { Car } from 'models';

// Brand logos
import mazdaLogo from '/brands/mazda.png';

// Mazda RX-7 1992
import rx7Model from 'assets/rx7/rx7';
import rx7Image from '/rx7/rx7.jpg';

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
    colors: [
      { name: 'Vintage Red', hexCode: '#BD0000' },
      { name: 'Competition Yellow mica', hexCode: '#fbe03c' },
      { name: 'Montego Blue', hexCode: '#445055' },
      { name: 'Brilliant Black', hexCode: '#0f0f0f' },
      { name: 'Silver Stone', hexCode: '#ceced4' },
      { name: 'Crystal White', hexCode: '#fbfcfa' },
    ],
    annotations: [
      {
        index: 1,
        // position: { x: 3.1, y: -4.8125, z: -1 },
        position: { x: 4.75, y: -3.4, z: -2 },
        // cameraPosition: { x: 35, y: 5, z: 0 },
        cameraPosition: { x: 30, y: 4.5, z: 25 },
        label: 'Enkei wheels',
        description:
          'The 1992 Mazda RX-7 FD came with Enkei 16-inch wheels, 7 inches wide in the front and 8 inches wide in the rear, with a 4x100 mm bolt pattern and a +50 mm offset. The stock tires were 205/55R16 in the front and 225/50R16 in the rear. These wheels were designed to enhance both performance and style.',
      },
      {
        index: 2,
        position: { x: -2.25, y: 7.25, z: -1.7 },
        cameraPosition: { x: -15, y: 1, z: -35 },
        label: 'Exhaust system',
        description: `The RX-7 FD's stock exhaust features a dual layout with 2.5-inch stainless steel piping, a high-flow catalytic converter, and polished round tips, delivering a lightweight design and a distinct rotary engine tone. Aftermarket options, like larger cat-back systems or straight pipes, enhance flow, performance, and the iconic "brap-brap" sound.`,
      },
    ],
  },
];

export const brakeCaliperColors = ['#000000', '#FF0000', '#FFFF00', '#0000FF'];

export const seatColors = ['#000000', '#d0b090', '#a14844'];

export const wheelColors = [
  '#FFFFFF', // White
  '#A7A7A7', // Silver
  '#2A3439', // Gunmetal
  '#000000', // Matte Black
  '#b08d57', // Bronze
];

export const windowTintOptions = [
  '#4B4B4B', // Charcoal
  '#D3D3D3', // Light Smoke
  '#A9A9A9', // Medium Smoke
  '#808080', // Dark Smoke
  '#000000', // Jet Black
  '#8B6E4E', // Bronze
  '#C0C0C0', // Mirror Silver
];
