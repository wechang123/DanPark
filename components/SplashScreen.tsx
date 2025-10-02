
import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

// 로컬 이미지 import
const danparkLogo = require('../assets/images/danpark_logo.png');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    // 2.5초 후 스플래시 화면 종료
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image 
          source={danparkLogo} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C2A66', // bg-blue-900
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 256, // w-64
    height: 'auto',
    aspectRatio: 2, // 원본 이미지 비율에 따라 조정 필요
  },
});

export default SplashScreen;
