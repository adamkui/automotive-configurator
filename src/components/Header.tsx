import classNames from 'classnames';
import { FC, useState } from 'react';
import { BiSolidHide } from 'react-icons/bi';
import { HiAnnotation } from 'react-icons/hi';
import {
  IoArrowBack,
  IoInformationCircleSharp,
  IoPauseSharp,
  IoPlayCircle,
} from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppSelector } from 'store';
import { toggleAnnotations, toggleRotation } from 'store/controls';
import { camelCaseToFormatted, chunkArrayByIndexes } from 'utils';
import { AnnotationsStepper } from './AnnotationsStepper';

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeCar, activeBodyColor } = useAppSelector(
    ({ selectionsSlice }) => selectionsSlice
  );
  const { canRotate, showAnnotations } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );
  const [showMoreInformation, setShowMoreInformation] =
    useState<boolean>(false);

  const colorName =
    activeCar?.colors?.find(({ hexCode }) => hexCode === activeBodyColor)
      ?.name || '';

  const setRotation = () => {
    dispatch(toggleRotation());
  };

  const setAnnotations = () => {
    dispatch(toggleAnnotations());
  };

  const renderMoreInformation = () => {
    const moreInformation = activeCar?.moreInformation;

    if (!moreInformation || !showMoreInformation) return null;

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

  return (
    <>
      <header className="header">
        <div>
          <IoArrowBack
            size={28}
            className="icon"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="header-center">
          <img
            src={activeCar?.brandLogoSrc}
            alt={`${activeCar?.name}-brand-logo`}
            className="header-brand-logo"
          />
          <div className="header-car">
            <h1>{activeCar?.name}</h1>
            <h4>{colorName}</h4>
          </div>
        </div>
        <div className="header-right">
          {canRotate ? (
            <IoPauseSharp size={32} className="icon" onClick={setRotation} />
          ) : (
            <IoPlayCircle
              size={32}
              className={classNames('icon', { disabled: showAnnotations })}
              onClick={setRotation}
            />
          )}
          <IoInformationCircleSharp
            size={32}
            className="icon"
            onClick={() => setShowMoreInformation(!showMoreInformation)}
          />
          {showAnnotations ? (
            <BiSolidHide size={32} className="icon" onClick={setAnnotations} />
          ) : (
            <HiAnnotation size={32} className="icon" onClick={setAnnotations} />
          )}
        </div>
        <AnnotationsStepper />
        {renderMoreInformation()}
      </header>
    </>
  );
};
