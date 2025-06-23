import React, { useEffect } from 'react';
import { Dimensions, View, ActivityIndicator, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLast7DaysScreenTime } from '../redux/screentimeSlice';

export default function ScreenTimeChart() {
  const dispatch = useDispatch();
  const { last7Days, loading, error } = useSelector(
    (state) => state.screentime
  );

  useEffect(() => {
    dispatch(fetchLast7DaysScreenTime());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Erro: {error}</Text>
      </View>
    );
  }

  if (!last7Days || last7Days.length <= 1) {
    return (
      <View className="flex-1 justify-center items-center py-4 text-center">
        <Text className="text-lg text-center font-quickregular">
          Dentro de 2 dias, você verá o gráfico de comparação de screentime.
        </Text>
      </View>
    );
  }

  // Preparar dados para o gráfico
  const chartData = {
    labels: last7Days.map((item) => item.date),
    datasets: [
      {
        data: last7Days.map((item) => {
          const minutes = item.total_minutes || 0;
          return Math.round(minutes / 60); // Convertendo minutos para horas
        }),
      },
    ],
  };

  return (
    <>
      {/* Line Chart */}
      <LineChart
        data={chartData}
        transparent
        width={Dimensions.get('window').width * 0.8} // Adjust width to fit inside the card
        height={220} // Chart height
        chartConfig={{
          decimalPlaces: 0, // No decimal points
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Line color: Orange
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color: Black
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5', // Dot size
            strokeWidth: '2',
            stroke: '#ffffff', // White outline around dots
          },
        }}
        bezier // Smooth curve
        style={{
          borderRadius: 16,
          paddingRight: 40,
          position: 'relative',
          left: -10,
        }}
        yAxisSuffix="h" // Add "h" to Y-axis values
        fromZero // Ensure Y-axis starts at 0
      />
    </>
  );
}
