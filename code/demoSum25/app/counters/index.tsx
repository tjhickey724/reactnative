import { Link } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Counters Home</Text>
          <Text style={styles.subtitle}>Try out the counters</Text>
        </View>
        
        <View style={styles.navigationContainer}>
          <Link href="/" style={styles.linkContainer}>
            <View style={styles.linkButton}>
              <Text style={styles.linkText}>Go back home</Text>
            </View>
          </Link>
          

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  linkContainer: {
    width: '100%',
  },
  linkButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  linkText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  linkSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});