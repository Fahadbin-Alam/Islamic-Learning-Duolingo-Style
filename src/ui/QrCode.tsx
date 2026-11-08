import React, { memo, useMemo } from "react";
import { create } from "qrcode";
import Svg, { Path, Rect } from "react-native-svg";
import { colors } from "./theme";

export type QrCodeProps = {
  value: string;
  size: number;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
};

/** Scanners want 4 light modules around the code. */
const QUIET = 4;

/** One path of 1×1 squares over the dark modules, in module units. */
export function qrPath(value: string) {
  const { modules } = create(value, { errorCorrectionLevel: "M" });
  let d = "";
  for (let row = 0; row < modules.size; row += 1) {
    for (let col = 0; col < modules.size; col += 1) {
      if (modules.get(row, col)) d += `M${col + QUIET} ${row + QUIET}h1v1h-1z`;
    }
  }
  return { d, span: modules.size + QUIET * 2 };
}

/** A QR code drawn with react-native-svg, dark on white. */
export const QrCode = memo(function QrCode({ value, size, color = colors.ink, testID, accessibilityLabel }: QrCodeProps) {
  const { d, span } = useMemo(() => qrPath(value), [value]);
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${span} ${span}`} testID={testID} accessibilityLabel={accessibilityLabel} accessible={Boolean(accessibilityLabel)}>
      <Rect x={0} y={0} width={span} height={span} fill="#FFFFFF" />
      <Path d={d} fill={color} />
    </Svg>
  );
});
