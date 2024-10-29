import { useState, useEffect } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

function App(): React.JSX.Element {

  const VSpacer = ({ size }: { size?: number }) => <View style={{ ...(size ? { height: size } : { flex: 1 }) }} />;
  const HSpacer = ({ size }: { size?: number }) => <View style={{ ...(size ? { width: size } : { flex: 1 }) }} />;

  const [humidity, setHumidity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialHumidity = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 500));

        // Replace with your actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setHumidity(data.humidity);

        setHumidity(75);

        // throw new Error('An unknown error occurred');
      } catch (error: any) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialHumidity();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <VSpacer />
        <Text style={styles.title}>Humidity (%)</Text>
        <Text style={styles.humidity}>{humidity}</Text>
        <VSpacer />
        <Text style={styles.disclaimer}>Source: OpenWeather API</Text>
        <VSpacer size={20} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  humidity: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  error: {
    fontSize: 16,
  },
});

export default App;