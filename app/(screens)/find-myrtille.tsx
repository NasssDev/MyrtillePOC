import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScore } from '@/context/ScoreContext';

const ThreeJsContent = (base64Model: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; }
      canvas { width: 100%; height: 100%; }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
  </head>
  <body>
    <script>
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const loader = new THREE.GLTFLoader();
      let model;
      
      // Convert base64 to blob URL
      const base64ToBlob = async (base64) => {
        const response = await fetch(base64);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      };

      // Load model from base64
      const modelData = '${base64Model}';
      const modelUrl = base64ToBlob('data:application/octet-stream;base64,' + modelData);
      
      modelUrl.then(url => {
        loader.load(
          url,
          function (gltf) {
            model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            scene.add(model);
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.error('An error happened:', error);
          }
        );
      });

      camera.position.z = 5;

      let isDragging = false;
      let previousTouch = { x: 0, y: 0 };

      document.addEventListener('touchstart', (event) => {
        isDragging = true;
        previousTouch = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      });

      document.addEventListener('touchmove', (event) => {
        if (!isDragging || !model) return;
        
        const deltaX = event.touches[0].clientX - previousTouch.x;
        const deltaY = event.touches[0].clientY - previousTouch.y;
        
        model.rotation.y += deltaX * 0.01;
        model.rotation.x += deltaY * 0.01;
        
        previousTouch = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      });

      document.addEventListener('touchend', () => {
        isDragging = false;
      });

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    </script>
  </body>
</html>
`;

export default function FindMyrtille() {
  const router = useRouter();
  const { addPoints } = useScore();
  const [found, setFound] = useState(false);
  const [modelBase64, setModelBase64] = useState<string>('');

  // Load the model file when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        const asset = Asset.fromModule(require('@/assets/3D/myrtille_clickable.glb'));
        await asset.downloadAsync();
        
        // Read the file in chunks
        const chunkSize = 1024 * 512; // 512KB chunks
        const fileInfo = await FileSystem.getInfoAsync(asset.localUri!);
        let base64 = '';
        
        for (let offset = 0; offset < fileInfo.size; offset += chunkSize) {
          const chunk = await FileSystem.readAsStringAsync(asset.localUri!, {
            encoding: FileSystem.EncodingType.Base64,
            length: Math.min(chunkSize, fileInfo.size - offset),
            position: offset,
          });
          base64 += chunk;
        }
        
        setModelBase64(base64);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

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
            Trouve Myrtille cachée dans la scène et appuie dessus !
          </ThemedText>
          
          <View style={styles.modelContainer}>
            {modelBase64 && (
              <WebView
                source={{ html: ThreeJsContent(modelBase64) }}
                style={styles.webview}
                javaScriptEnabled={true}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn('WebView error:', nativeEvent);
                }}
              />
            )}
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
  },
  instructions: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
    zIndex: 2,
  },
  modelContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
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