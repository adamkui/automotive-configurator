import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  bodyColors,
  brakeCaliperColors,
  seatColors,
  wheelColors,
} from 'assets/cars';
import { CarColor } from 'models';
import { useAppSelector } from 'store';
import {
  setActiveBodyColor,
  setActiveBrakeCaliperColor,
  setActiveSeatColor,
  setActiveWheelColor,
} from 'store/selections';
import { camelCaseToFormatted, chunkArrayByIndexes } from 'utils';

export const ConfigPalette: FC = () => {
  const dispatch = useDispatch();
  const {
    activeCar,
    activeBodyColor,
    activeBrakeCaliperColor,
    activeSeatColor,
    activeWheelColor,
  } = useAppSelector(({ selectionsSlice }) => selectionsSlice);
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>();

  const options: { label: string }[] = [
    { label: 'MORE INFORMATION' },
    { label: 'BODY COLOR' },
    { label: 'RIM COLOR' },
    { label: 'INTERIOR COLOR' },
    { label: 'BRAKE CALIPER COLOR' },
  ];

  const onTabClick = (index: number) => {
    setActiveTabIndex(index === activeTabIndex ? undefined : index);
  };

  const renderOptions = () => {
    const renderFunctions: Record<number, () => JSX.Element | null> = {
      0: renderMoreInformation,
      1: renderBodyColorOptions,
      2: renderWheelColorOptions,
      3: renderSeatColorOptions,
      4: renderBrakeCaliperColorOptions,
    };

    return activeTabIndex === undefined
      ? null
      : renderFunctions[activeTabIndex]?.();
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

  const renderSeatColorOptions = () => {
    return (
      <div className="config-options">
        {seatColors.map((hexCode) => {
          return (
            <button
              key={hexCode}
              className={classNames('config-option', {
                active: hexCode === activeSeatColor,
              })}
              style={{ background: hexCode }}
              onClick={() => dispatch(setActiveSeatColor(hexCode))}
            />
          );
        })}
      </div>
    );
  };

  const renderWheelColorOptions = () => {
    return (
      <div className="config-options">
        {wheelColors.map((hexCode) => {
          return (
            <button
              key={hexCode}
              className={classNames('config-option', {
                active: hexCode === activeWheelColor,
              })}
              style={{ background: hexCode }}
              onClick={() => dispatch(setActiveWheelColor(hexCode))}
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
