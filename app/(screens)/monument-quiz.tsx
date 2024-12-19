import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScore } from '@/context/ScoreContext';

// Simulation d'une question de quiz
const SAMPLE_QUIZ = {
  question: "De quelle couleur est la Tour Eiffel ?",
  options: [
    "Rouge",
    "Marron",
    "Bleue",
    "Verte"
  ],
  image: require('@/assets/images/monument-sample.jpg')
};

export default function MonumentQuiz() {
  const router = useRouter();
  const { addPoints } = useScore();
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    addPoints(5); // Chaque réponse donne 5 points
    setAnswered(true);
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Quiz des Monuments
      </ThemedText>

      {!answered ? (
        <>
          <Image
            source={SAMPLE_QUIZ.image}
            style={styles.monumentImage}
          />

          <ThemedText style={styles.question}>
            {SAMPLE_QUIZ.question}
          </ThemedText>

          {SAMPLE_QUIZ.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.answerButton}
              onPress={handleAnswer}
            >
              <ThemedText style={styles.answerText}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <ThemedView style={styles.successContainer}>
          <ThemedText type="title" style={styles.successText}>
            Bravo pour ta réponse ! 🎉
          </ThemedText>
          <ThemedText style={styles.points}>+5 points</ThemedText>
        </ThemedView>
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
    marginBottom: 20,
  },
  monumentImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  answerButton: {
    backgroundColor: '#0066FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  answerText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
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