import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { setHasSeenOnboarding } from '../../storage/onboarding';

const { width } = Dimensions.get('window')

const slides = [
  { id: '1', title: 'Welcome', description: 'Discover what our app can do for you.' },
  { id: '2', title: 'Fast & Simple', description: 'Everything you need, in one place.' },
  { id: '3', title: 'Get Started', description: "Let's set up your account." },
];

const OnboardingScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const finishOnboarding = async () => {
    await setHasSeenOnboarding();
    navigation.replace('Auth');
  };

  const onNext = () => {
    if (index < slides.length - 1) {
      const nextIndex = index + 1;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setIndex(nextIndex);
    } else {
      finishOnboarding();
    }
  };

  const onScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skip} onPress={finishOnboarding}>
        <Text style={styles.skipText}> Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>
            {index === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  skip: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  skipText: { fontSize: 16, color: '#888' },
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 12 },
  description: { fontSize: 16, textAlign: 'center', color: '#555' },
  footer: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  dots: { flexDirection: 'row', marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#333', width: 20 },
  nextButton: { backgroundColor: '#FF5722', paddingVertical: 14, paddingHorizontal: 60, borderRadius: 30 },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default OnboardingScreen;