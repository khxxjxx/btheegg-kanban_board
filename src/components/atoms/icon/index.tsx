interface IconProps {
  type: keyof typeof svgInfo;
  size?: string | number;
  color?: React.CSSProperties['color'];
}

const svgInfo = {
  plus: {
    viewBox: '0 0 14 14',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    d: ['M11.9497 7.00004L2.05025 7.00004M7 11.9498L7 2.05029'],
  },
  close: {
    viewBox: '64 64 896 896',
    stroke: undefined,
    strokeWidth: undefined,
    d: [
      'M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z',
    ],
  },
};

const Icon = (props: IconProps) => {
  const { type, size = '1em', color = 'currentcolor' } = props;

  return (
    <svg
      className={`icon ${type}`}
      width={size}
      height={size}
      viewBox={svgInfo[type].viewBox}
      fill={color}
    >
      {svgInfo[type].d.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke={svgInfo[type].stroke}
          strokeWidth={svgInfo[type].strokeWidth}
        />
      ))}
    </svg>
  );
};

export default Icon;
