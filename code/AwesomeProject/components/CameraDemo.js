import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

 import ImageViewer from './components/ImageViewer'; 

const PlaceholderImage = require('./assets/images/background-image.png');

export default function CameraDemo() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
});
