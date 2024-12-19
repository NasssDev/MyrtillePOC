import { StyleSheet, View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export function ScannerOverlay() {
  const scanLine = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.scannerOverlay}>
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [
              {
                translateY: scanLine.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scannerOverlay: {
    position: 'absolute',
    top: 100,
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#0066FF',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  scanLine: {
    height: 2,
    backgroundColor: '#0066FF',
    width: '100%',
  },
}); 