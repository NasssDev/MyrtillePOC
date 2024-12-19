import {  StyleSheet, TouchableOpacity, View } from 'react-native';
import { CameraView as ExpoCamera, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

import { ScannerOverlay } from '@/components/ScannerOverlay';

export default function TabOneScreen() {
  const router = useRouter();
  const [hasPermission] = useCameraPermissions();
  

  if (!hasPermission) {
    return <View style={styles.container} />;
  }

  function handleScan() {
    const random = Math.random();
    if (random > 0.5) {
      router.push('/(screens)/find-myrtille');
    } else {
      // router.push('/(screens)/monument-quiz');
      router.push('/(screens)/find-myrtille');

    }
  }

  return (
    <View style={styles.container}>
      <ExpoCamera 
        style={styles.camera} 
        facing="front"
      >
        <ScannerOverlay />
        <TouchableOpacity 
          style={styles.invisibleButton}
          onPress={handleScan}
        />
      </ExpoCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  invisibleButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '33%',
    backgroundColor: 'transparent',
  },
});
