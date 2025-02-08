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
