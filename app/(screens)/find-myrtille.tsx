import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScore } from '@/context/ScoreContext';

export default function FindMyrtille() {
  const router = useRouter();
  const { addPoints } = useScore();
  const [found, setFound] = useState(false);

  const handleFindMyrtille = () => {
    setFound(true);
    addPoints(10);
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Où est Myrtille ?
      </ThemedText>

      {!found ? (
        <>
          <ThemedText style={styles.instructions}>
            Trouve Myrtille cachée dans l'image et appuie dessus !
          </ThemedText>
          
          <View style={styles.imageContainer}>
            {/* Simulation d'une scène AR avec une image statique */}
            <Image
              source={require('@/assets/images/monument-background.jpg')}
              style={styles.backgroundImage}
            />
            <TouchableOpacity 
              style={styles.hiddenButton}
              onPress={handleFindMyrtille}
            />
          </View>
        </>
      ) : (
        <View style={styles.successContainer}>
          <ThemedText type="title" style={styles.successText}>
            Bravo ! Tu as trouvé Myrtille ! 🎉
          </ThemedText>
          <ThemedText style={styles.points}>+10 points</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#0066FF',
    textAlign: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '300%',
    height: '400%',
    position: 'absolute',
    zIndex: 1,
  },
  hiddenButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: '30%',
    bottom: '40%',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    color: '#0066FF',
    marginBottom: 20,
  },
  points: {
    fontSize: 24,
    color: '#0066FF',
    fontWeight: 'bold',
  },
}); 