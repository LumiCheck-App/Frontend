import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function ScreenTimeChart() {
  return (
    <>
      {/* Line Chart */}
      <LineChart
        data={{
          labels: ["16/1", "17/1", "18/1", "19/1", "20/1", "21/1", "22/1"], // Dates for X-axis
          datasets: [
            {
              data: [4, 5, 7, 8, 3, 6], // Hours for Y-axis
            },
          ],
        }}
        transparent
        width={Dimensions.get("window").width * 0.8} // Adjust width to fit inside the card
        height={220} // Chart height
        chartConfig={{
          decimalPlaces: 0, // No decimal points
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Line color: Orange
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color: Black
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5", // Dot size
            strokeWidth: "2",
            stroke: "#ffffff", // White outline around dots
          },
        }}
        bezier // Smooth curve
        style={{
          borderRadius: 16,
          paddingRight: 40,
          position: "relative",
          left: -10,
        }}
        yAxisSuffix="h" // Add "h" to Y-axis values
        fromZero // Ensure Y-axis starts at 0
      />
    </>
  );
}
