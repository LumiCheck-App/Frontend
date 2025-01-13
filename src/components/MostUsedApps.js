import React from "react";
import { View, Text, Image } from "react-native";

export default function MostUsedApps() {
  //Ir buscar dados á API
  const UserAppData = [
    {
      id: 0,
      image: require("../../assets/insta-logo.png"),
      hours: 4.5,
      date: "11/01/2025",
    },
    {
      id: 1,
      image: require("../../assets/tiktok-logo.png"),
      hours: 5,
      date: "11/01/2025",
    },
    {
      id: 2,
      image: require("../../assets/facebook-logo.png"),
      hours: 4,
      date: "11/01/2025",
    },
    {
      id: 3,
      image: require("../../assets/youtube-logo.png"),
      hours: 3.5,
      date: "11/01/2025",
    },
    {
      id: 4,
      image: require("../../assets/shein-logo.jpg"),
      hours: 3,
      date: "11/01/2025",
    },
    {
      id: 5,
      image: require("../../assets/tiktok-logo.png"),
      hours: 1,
      date: "11/01/2025",
    },
    {
      id: 6,
      image: require("../../assets/facebook-logo.png"),
      hours: 1,
      date: "11/01/2025",
    },
    {
      id: 7,
      image: require("../../assets/cc-logo.jpg"),
      hours: 2.2,
      date: "11/01/2025",
    },
  ];

  const Data_time_ordered = [...UserAppData]
    .sort((a, b) => b.hours - a.hours) // Sort by descending `hours`
    .slice(0, 6); // Take only the top 6 elements
  return (
    <View>
      {Data_time_ordered.map((Data, index) => {
        let Time_percentage;

        if (Data.hours === 0) {
          Time_percentage = "0%";
        }

        if (Data.hours >= 5) {
          Time_percentage = "100%";
        } else {
          Time_percentage = `${(Data.hours * 100) / 6 + 10}%`;
        }

        return (
          <View key={`data_${index}`} className="flex-row mt-3">
            <View className="w-1/6">
              <Image
                source={Data.image}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>

            <View className="w-10/12 px-2 items-start justify-center">
              <View
                className="h-5 bg-violet rounded-full"
                style={{ width: Time_percentage }}
              ></View>
            </View>
          </View>
        );
      })}

      <View className="w-full px-2 h-5 flex-row items-end justify-end mt-6">
        <View className=" w-10/12 h-5 flex-row items-center justify-between">
          <Text className="font-bold">0h</Text>
          <Text className="font-bold">1h</Text>
          <Text className="font-bold">2h</Text>
          <Text className="font-bold">3h</Text>
          <Text className="font-bold">4h</Text>
          <Text className="font-bold">5h +</Text>
        </View>
      </View>
    </View>
  );
}
