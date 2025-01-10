import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useState } from "react";

import { bodyColors } from "../assets/constants";

interface ConfigPaletteProps {
  setActiveBodyColor: Dispatch<SetStateAction<string | undefined>>;
}

export const ConfigPalette: FC<ConfigPaletteProps> = ({
  setActiveBodyColor,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>();

  const options: { label: string; dataId: string }[] = [
    { label: "BODY COLOR", dataId: "body_colors" },
    { label: "WHEEL COLOR", dataId: "wheel_colors" },
  ];

  const onTabClick = (index: number) => {
    setActiveTabIndex(index === activeTabIndex ? undefined : index);
  };

  const renderOptions = () => {
    if (activeTabIndex === 0) {
      return renderBodyColorOptions();
    }

    return null;
  };

  const renderBodyColorOptions = () => {
    return (
      <div className="config-options">
        {bodyColors.map((color) => {
          return (
            <button
              key={color}
              className="config-option"
              style={{ background: color }}
              onClick={() => setActiveBodyColor(color)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={"config-palette"}>
      <ul className={"config-tab-list"}>
        {options.map(({ label, dataId }, index) => {
          return (
            <li key={dataId}>
              <a
                className={classNames("config-tab", {
                  active: index === activeTabIndex,
                })}
                data-id={dataId}
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
