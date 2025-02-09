import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useOutsideClick } from '@/hooks';

interface IOption {
  key?: string;
  label?: React.ReactNode;
  [key: string]: any;
}

interface DropdownProps<T> {
  open?: boolean;
  width?: 'auto' | 'fit';
  trigger?: 'click' | 'hover';
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';

  options: (IOption & T)[];
  selectedOption?: IOption & T;
  targetFields?: { key?: keyof T; label?: keyof T };
  children: React.ReactNode;
  onOpen?: (open: boolean) => void;
  labelRender?: (option: T) => React.ReactNode;
  render?: (originNode: JSX.Element[]) => React.ReactNode;
  onChange?: (option: T) => void;
}

const Dropdown = <T extends unknown>(props: DropdownProps<T>) => {
  const {
    open,
    width,
    placement = 'bottomLeft',
    trigger = 'click',
    selectedOption,
    options = [],
    targetFields,
    children,
    onOpen,
    labelRender,
    render,
    onChange,
  } = props;

  const [value, setValue] = useState<(IOption & T) | undefined>(selectedOption);
  const [active, setActive] = useState(false);

  const isActive = open ?? active;
  const setIsActive = onOpen ?? setActive;

  const ref = useOutsideClick(() => setIsActive(false));

  const target = { key: 'key', label: 'label', ...targetFields };

  const yPosition = placement.includes('top') ? 'top' : 'bottom';
  const xPosition = placement.includes('Left')
    ? 'left'
    : placement.includes('Right')
    ? 'right'
    : 'center';

  const DropdownOption = options.map((option) => (
    <li
      key={option[target.key]}
      className={`dropdown-option ${
        value?.[target.key] === option[target.key] ? 'active' : ''
      }`}
      onClick={() => {
        setValue(option);
        onChange?.(option);
      }}
    >
      {labelRender ? labelRender(option) : option[target.label]}
    </li>
  ));

  useEffect(() => setValue(selectedOption), [selectedOption]);

  return (
    <StyledDropdown
      ref={ref}
      $y={yPosition}
      $x={xPosition}
      $width={width}
      className='dropdown-component'
      {...(trigger === 'click'
        ? { onClick: () => setIsActive(!isActive) }
        : {
            onMouseOver: () => setIsActive(true),
            onMouseOut: () => setIsActive(false),
          })}
    >
      <div className='target'>{children}</div>
      <div className='dropdown-wrapper'>
        <div className={`dropdown ${isActive ? 'active' : 'inactive'}`}>
          <ul className='p-1'>
            {render ? render(DropdownOption) : DropdownOption}
          </ul>
        </div>
      </div>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div<{
  $y: 'top' | 'bottom';
  $x: 'left' | 'right' | 'center';
  $width?: 'auto' | 'fit';
}>`
  display: flex;
  width: ${({ $width }) => ($width === 'auto' ? 'auto' : 'fit-content')};
  flex-direction: ${({ $y }) => ($y === 'top' ? 'column-reverse' : 'column')};

  & > .target {
    cursor: pointer;
  }

  & > .dropdown-wrapper {
    position: relative;
    & > .dropdown {
      position: absolute;
      background-color: ${({ theme }) => theme.color.black0};
      ${({ $y }) => ($y === 'top' ? 'bottom: 0' : 'top: 0')};
      ${({ $x }) => {
        switch ($x) {
          case 'left':
            return css`
              left: 0;
            `;
          case 'right':
            return css`
              right: 0;
            `;
          case 'center':
            return css`
              left: 50%;
              translate: -50%;
            `;
        }
      }}
      width: max-content;
      border-radius: 8px;
      overflow: hidden;
      transition-property: max-height;
      transition-duration: 200ms;
      box-shadow: 0 6px 16px 0 #000000b3;

      &.active {
        max-height: 100vh;
      }

      &.inactive {
        max-height: 0px;
        transition-timing-function: cubic-bezier(0, 1, 0, 1);
      }

      & > ul {
        padding: 4px;

        & li {
          font-size: 14px;
          padding: 4px;
          border-radius: 8px;

          &.dropdown-option {
            cursor: pointer;
          }
          &.dropdown-option:hover,
          &.dropdown-option.active {
            background-color: ${({ theme }) => theme.color.black10};
          }
        }
      }
    }
  }
`;

export default Dropdown;
