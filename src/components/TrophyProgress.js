import React from 'react';
import { View, Text } from 'react-native';
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';

const TrophyProgress = ({ text, description, progress, total, icon }) => {
  const progressWidth = `${(progress / total) * 100}%`;
  let IconComponent = icon || BlockedTrophy;

  // Check if IconComponent is valid
  if (!IconComponent) {
    console.error('IconComponent is undefined for icon:', icon);
    return null; // or return a placeholder
  }

  return (
    <View className="flex-row items-center w-full">
      {/* Ícone */}
      <View
        className={`mr-4 ${progress !== undefined && total !== undefined ? '' : 'py-2'}`}
      >
        <IconComponent width={50} height={50} />
      </View>
      <View className="flex-1">
        {/* Texto */}
        <Text className="text-lg font-quickregular mb-2 line-clamp-1">
          {description}
        </Text>

        {/* Barra de progresso */}
        {progress !== undefined && total !== undefined && (
          <>
            <View className="h-3 bg-white rounded-full overflow-hidden border border-light-gray">
              <View
                style={{ width: progressWidth }}
                className="h-full bg-violet rounded-full"
              />
            </View>

            <Text className="text-sm text-dark-gray text-right mt-1">{`${progress}/${total}`}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default TrophyProgress;
