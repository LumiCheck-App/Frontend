import React from 'react';
import { View, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getAppIcon } from "../sevices/AppIconService";


export default function MostUsedApps({appTime}) {

  // Filter out specific apps from the appTime array
  appTime.map((app) => {
    if(app.appName == "home" || app.appName == "deskclock" || app.appName == "settings" || app.appName == "phone" || app.appName == "messages" || app.appName == "contacts" || app.appName == "cleaner"){
      appTime.splice(appTime.indexOf(app), 1);
    }
  })
  
  const Data_time_ordered = [...appTime]
    .sort((a, b) => b.time - a.time) // Sort by descending `hours`
    .slice(0, 6); // Take only the top 6 elements

  return (
    <View>
      {Data_time_ordered.map((Data, index) => {
        let Time_percentage;

        if(Data.time < 60){
          Time_percentage = '0%';
        }else{
          if(Data.time >= 60){
            const hours = Math.floor(Data.time / 60);
            if (hours >= 5) {
              Time_percentage = '100%';
            }else {
              Time_percentage = `${(hours * 100) / 6 + 10}%`
            }
          }
        }

        const [iconUrl, setIconUrl] = useState(null);

        useEffect(() => {
                (async () => {
                    const icon = await getAppIcon(Data.id);
                    if (icon) {
                        setIconUrl(icon);
                    }
                })();
            }, [Data.id]);

        return (
          <View
            key={`data_${index}`}
            className="flex-row mt-3"
            accessibilityLabel="Tempo de uso da aplicação"
          >
            <View className="w-1/6">
              <Image
                source={{ uri: iconUrl || "https://reactnative.dev/img/tiny_logo.png" }}
                className="w-8 h-8"
                resizeMode="contain"
                accessibilityLabel={`${Data.appName} ${Data.time} horas`}
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

      <View
        className="w-full px-2 h-5 flex-row items-end justify-end mt-6"
        importantForAccessibility="no-hide-descendants"
      >
        <View className=" w-10/12 h-5 flex-row items-center justify-between">
          <Text className="font-quickbold">0h</Text>
          <Text className="font-quickbold">1h</Text>
          <Text className="font-quickbold">2h</Text>
          <Text className="font-quickbold">3h</Text>
          <Text className="font-quickbold">4h</Text>
          <Text className="font-quickbold">5h +</Text>
        </View>
      </View>
    </View>
  );
}
