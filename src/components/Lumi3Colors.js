import React from 'react';
import { View, Text, Image } from 'react-native';
import Lumi from '../../assets/lumis/Lumi.svg';
import LumiLaranja from '../../assets/lumis/LumiLaranja.svg';
import LumiVermelha from '../../assets/lumis/LumiVermelha.svg';

const Lumi3Colors = ({ negative, neutral, positive }) => {
  const marginHorizontal = 2.2;
  const marginFactor = marginHorizontal * 2;
  const total = Number(negative) + Number(neutral) + Number(positive);

  const adjustedWidthFactor = 100 - marginFactor;
  const negativeWidth = `${(negative / total) * adjustedWidthFactor}%`;
  const neutralWidth = `${(neutral / total) * adjustedWidthFactor}%`;
  const positiveWidth = `${(positive / total) * adjustedWidthFactor}%`;

  return (
    <View className="w-11/12 mt-8" accessible={true}>
      <View className="bg-white rounded-lg border border-light-gray p-4">
        {/* Título */}
        <View className="mb-4">
          <Text
            className="text-xl font-quickbold text-black"
            accessibilityRole="header"
          >
            Perguntas da Lumi
          </Text>
        </View>

        {/* Barras combinadas */}
        <View className="flex-row items-center h-3 overflow-hidden rounded-full mb-6">
          {/* Barra Negativa */}
          <View
            style={{ width: negativeWidth }}
            className="h-full bg-red rounded-l-full"
          />

          {/* Espaço entre barras */}
          <View style={{ width: 4 }} />

          {/* Barra Neutra */}
          <View style={{ width: neutralWidth }} className="h-full bg-orange" />

          {/* Espaço entre barras */}
          <View style={{ width: 4 }} />

          {/* Barra Positiva */}
          <View
            style={{ width: positiveWidth }}
            className="h-full bg-light-orange border border-orange rounded-r-full"
          />
        </View>

        <View className="flex-row items-center">
          {/* Barra Negativa */}
          <View className="flex-row items-center w-full justify-between">
            <View className="flex-col items-center">
              <Text
                className="text-sm text-dark-gray mb-2"
                accessibilityRole="text"
                accessibilityLabel={`Respostas negativas ${negative}`}
              >
                Negativas
              </Text>
              <View className="flex-row items-center justify-center">
                <LumiVermelha width={24} height={24} />
                <Text
                  className="text-lg font-quickbold ml-2"
                  importantForAccessibility="no-hide-descendants"
                >
                  {negative}
                </Text>
              </View>
            </View>

            <View className="flex-col items-center">
              <Text
                className="text-sm text-dark-gray mb-2"
                accessibilityRole="text"
                accessibilityLabel={`Respostas neutras ${neutral}`}
              >
                Neutras
              </Text>
              <View className="flex-row items-center justify-center">
                <LumiLaranja width={24} height={24} />
                <Text
                  className="text-lg font-quickbold ml-2"
                  importantForAccessibility="no-hide-descendants"
                >
                  {neutral}
                </Text>
              </View>
            </View>

            <View className="flex-col items-center">
              <Text
                className="text-sm text-dark-gray mb-2"
                accessibilityRole="text"
                accessibilityLabel={`Respostas positivas ${positive}`}
              >
                Positivas
              </Text>
              <View className="flex-row items-center justify-center">
                <Lumi width={24} height={24} />
                <Text
                  className="text-lg font-quickbold ml-2"
                  importantForAccessibility="no-hide-descendants"
                >
                  {positive}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Lumi3Colors;
