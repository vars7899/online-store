import { IconStar, IconStarFilled } from "@tabler/icons-react";

const ReactRatingProps = (symbolSize = 20, symbolStrokeWidth = 1.5, symbolColor = "#e3b130") => ({
  emptySymbol: <IconStar size={symbolSize} strokeWidth={symbolStrokeWidth} color={symbolColor} colo />,
  fullSymbol: <IconStarFilled size={symbolSize} strokeWidth={symbolStrokeWidth} color={"red"} />,
  fractions: 1,
});

export default ReactRatingProps;
