import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function ArcProgressBar({ size, strokeWidth, progress }) {

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius * 0.8; // 80% of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Function to create an arc path
  const createArcPath = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  // Helper to convert polar coordinates to Cartesian
  const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={{ transform: [{ rotateX: "180deg" }] }}>
        {/* Background Arc */}
        <Path
          d={createArcPath(size / 2, size / 2, radius, 40, 320)} // 80% of the circle (from 40° to 320°)
          stroke="#d0d0d0"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <Path
          d={createArcPath(size / 2, size / 2, radius, 40, 320)}
          stroke="white"
          strokeWidth={strokeWidth + 10}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <Path
          d={createArcPath(size / 2, size / 2, radius, 40, 320)}
          stroke="#fcc766"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Text in the center */}
      <Text
        className="font-quickregular text-black absolute"
        style={{
          fontSize: size / 4 > 30 ? 30 : size / 4,
        }}
      >
        {`${progress}%`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
});
