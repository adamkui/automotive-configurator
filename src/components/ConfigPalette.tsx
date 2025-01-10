import classNames from 'classnames';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';

import { bodyColors } from 'assets/cars';
import { context } from 'Context';
import { camelCaseToFormatted, chunkArrayByIndexes } from 'utils';
import { CarColor } from 'models';

interface ConfigPaletteProps {
  setActiveBodyColor: Dispatch<SetStateAction<string | undefined>>;
}

export const ConfigPalette: FC<ConfigPaletteProps> = ({
  setActiveBodyColor,
}) => {
  const contextValues = useContext(context);
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>();

  const options: { label: string }[] = [
    { label: 'MORE INFORMATION' },
    { label: 'BODY COLOR' },
    { label: 'WHEEL COLOR' },
  ];

  const onTabClick = (index: number) => {
    setActiveTabIndex(index === activeTabIndex ? undefined : index);
  };

  const renderOptions = () => {
    if (activeTabIndex === 0) {
      return renderMoreInformation();
    }

    if (activeTabIndex === 1) {
      return renderBodyColorOptions();
    }

    return null;
  };

  const renderMoreInformation = () => {
    const moreInformation = contextValues?.activeCar?.moreInformation || {};

    return (
      <div className="more-information">
        {chunkArrayByIndexes(
          Object.entries(moreInformation),
          [3, 5, 8, 11, 16]
        ).map((informationChunk) => {
          return (
            <div className={'information-chunk'}>
              {informationChunk.map(([key, value]) => {
                return (
                  <div key={key}>
                    <p>
                      <b>{`${camelCaseToFormatted(key)}: `}</b>
                      {`${value}`}
                    </p>
                  </div>
                );
              })}
              <br />
            </div>
          );
        })}
      </div>
    );
  };

  const renderBodyColorOptions = () => {
    const colors: CarColor[] = contextValues?.activeCar?.colors || bodyColors;

    return (
      <div className="config-options">
        {colors.map(({ name, hexCode }) => {
          return (
            <button
              key={name}
              className="config-option"
              style={{ background: hexCode }}
              onClick={() => setActiveBodyColor(hexCode)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={'config-palette'}>
      <ul className={'config-tab-list'}>
        {options.map(({ label }, index) => {
          return (
            <li key={label}>
              <a
                className={classNames('config-tab', {
                  active: index === activeTabIndex,
                })}
                onClick={() => onTabClick(index)}
              >
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {renderOptions()}
    </div>
  );
};
