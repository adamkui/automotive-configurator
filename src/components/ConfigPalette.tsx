import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  brakeCaliperColors,
  seatColors,
  wheelColors,
  windowTintOptions,
} from 'assets/cars';
import { CarColor } from 'models';
import { useAppSelector } from 'store';
import {
  setActiveBodyColor,
  setActiveBrakeCaliperColor,
  setActiveSeatColor,
  setActiveWheelColor,
  setActiveWindowTint,
  setSuspensionHeight,
} from 'store/selections';

export const ConfigPalette: FC = () => {
  const dispatch = useDispatch();
  const {
    activeCar,
    activeBodyColor,
    activeBrakeCaliperColor,
    activeSeatColor,
    activeWheelColor,
    activeWindowTint,
    suspensionHeight,
  } = useAppSelector(({ selectionsSlice }) => selectionsSlice);
  const { showAnnotations } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>(0);

  const options: { label: string }[] = [
    { label: 'BODY COLOR' },
    { label: 'RIM COLOR' },
    { label: 'WINDOW TINT' },
    { label: 'INTERIOR COLOR' },
    { label: 'BRAKE CALIPER COLOR' },
    { label: 'RIDE HEIGHT' },
  ];

  const onTabClick = (index: number) => {
    setActiveTabIndex(index === activeTabIndex ? undefined : index);
  };

  const renderOptions = () => {
    const renderFunctions: Record<number, () => JSX.Element | null> = {
      0: renderBodyColorOptions,
      1: renderWheelColorOptions,
      2: renderWindowTintOptions,
      3: renderSeatColorOptions,
      4: renderBrakeCaliperColorOptions,
      5: renderRideHeightInput,
    };

    return activeTabIndex === undefined
      ? null
      : renderFunctions[activeTabIndex]?.();
  };

  const renderBodyColorOptions = () => {
    const colors: CarColor[] = activeCar?.colors ?? [];

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

  const renderWindowTintOptions = () => {
    return (
      <div className="config-options">
        {windowTintOptions.map((hexCode) => {
          return (
            <button
              key={hexCode}
              className={classNames('config-option', {
                active: hexCode === activeWindowTint,
              })}
              style={{ background: hexCode }}
              onClick={() => dispatch(setActiveWindowTint(hexCode))}
            />
          );
        })}
      </div>
    );
  };

  const renderRideHeightInput = () => {
    return (
      <div className="config-options">
        <input
          type="range"
          min={-0.275}
          max={0}
          step={0.05}
          value={suspensionHeight}
          onChange={({ target }) =>
            dispatch(setSuspensionHeight(Number(target.value)))
          }
        />
      </div>
    );
  };

  if (showAnnotations) return null;

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
