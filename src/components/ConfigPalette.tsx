import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { bodyColors, brakeCaliperColors } from 'assets/cars';
import { CarColor } from 'models';
import { useAppSelector } from 'store';
import {
  setActiveBodyColor,
  setActiveBrakeCaliperColor,
} from 'store/selections';
import { camelCaseToFormatted, chunkArrayByIndexes } from 'utils';

export const ConfigPalette: FC = () => {
  const dispatch = useDispatch();
  const { activeCar, activeBodyColor, activeBrakeCaliperColor } =
    useAppSelector(({ selectionsSlice }) => selectionsSlice);
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>();

  const options: { label: string }[] = [
    { label: 'MORE INFORMATION' },
    { label: 'BODY COLOR' },
    { label: 'BRAKE CALIPER COLOR' },
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

    if (activeTabIndex === 2) {
      return renderBrakeCaliperColorOptions();
    }

    return null;
  };

  const renderMoreInformation = () => {
    const moreInformation = activeCar?.moreInformation || {};

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
                      <i>{`${value}`}</i>
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
    const colors: CarColor[] =
      activeCar?.colors || bodyColors.map((hexCode) => ({ hexCode, name: '' }));

    return (
      <div className="config-options">
        {colors.map(({ name, hexCode }) => {
          return (
            <button
              key={name}
              className={classNames('config-option', {
                active: hexCode === activeBodyColor,
              })}
              style={{ background: hexCode }}
              onClick={() => dispatch(setActiveBodyColor(hexCode))}
            />
          );
        })}
      </div>
    );
  };

  const renderBrakeCaliperColorOptions = () => {
    return (
      <div className="config-options">
        {brakeCaliperColors.map((hexCode) => {
          return (
            <button
              key={hexCode}
              className={classNames('config-option', {
                active: hexCode === activeBrakeCaliperColor,
              })}
              style={{ background: hexCode }}
              onClick={() => dispatch(setActiveBrakeCaliperColor(hexCode))}
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
