import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScore } from '@/context/ScoreContext';

export default function Score() {
  const { score } = useScore();

  const getReward = () => {
    if (score >= 70) {
      return {
        text: "Premier Cadeau ! 🎁",
        image: require('@/assets/images/react-logo.png')
      };
    } else if (score >= 40) {
      return {
        text: "Deuxième Cadeau ! 🎈",
        image: require('@/assets/images/react-logo.png')
      };
    } else {
      return {
        text: "Troisième Cadeau ! 🌟",
        image: require('@/assets/images/react-logo.png')
      };
    }
  };

  const reward = getReward();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Mon Score
      </ThemedText>

      <ThemedView style={styles.scoreContainer}>
        <ThemedText type="title" style={styles.scoreText}>
          {score}
        </ThemedText>
        <ThemedText style={styles.pointsLabel}>
          points
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.rewardContainer}>
        <ThemedText type="subtitle" style={styles.rewardText}>
          {reward.text}
        </ThemedText>
        <Image
          source={reward.image}
          style={styles.rewardImage}
        />
      </ThemedView>
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
    marginBottom: 40,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 72,
    color: '#0066FF',
  },
  pointsLabel: {
    fontSize: 24,
    color: '#666',
  },
  rewardContainer: {
    alignItems: 'center',
  },
  rewardText: {
    color: '#0066FF',
    marginBottom: 20,
  },
  rewardImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
}); 