import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { navigate } from './NavigationRef';
import { getTrophyIcon } from '../assets/trophies';

const IconComponent = ({ svg, width = 40, height = 40 }) => {
  const SvgIcon = getTrophyIcon(svg);
  if (!SvgIcon) {
    return null;
  }

  return <SvgIcon width={width} height={height} />;
};

const toastConfig = {
  success: ({ text1, text2, props }) => {
    const handlePress = () => {
      navigate('Troféus', {
        screen: 'AllTrophies',
      });
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress} activeOpacity={0.9}>
        <View
          style={{
            backgroundColor: '#fff9ef',
            padding: 14,
            borderRadius: 12,
            width: '90%',
            alignSelf: 'center',
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <View style={{ marginRight: 12 }}>
            <IconComponent svg={props.svg} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'Quicksand_700Bold',
                marginBottom: 4,
              }}
            >
              {text1}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: 'Quicksand_400Regular',
              }}
            >
              {text2}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
};

export default toastConfig;
