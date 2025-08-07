import { Slot } from 'expo-router';
import { useFonts, NotoSansKR_400Regular } from '@expo-google-fonts/noto-sans-kr';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useAutoReset  } from '../hooks/useAutoReset'; // ✅ 자동 초기화 유틸 불러오기

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ NotoSansKR_400Regular });
  const [splashVisible, setSplashVisible] = useState(true);

  useAutoReset ('main'); // ✅ 메인 자동 초기화 실행
  useAutoReset ('sub1'); // ✅ 서브1 자동 초기화 실행
  useAutoReset ('sub2'); // ✅ 서브2 자동 초기화 실행

  useEffect(() => {
    const init = async () => {
      

      if (fontsLoaded) {
        SplashScreen.hideAsync();
        setTimeout(() => setSplashVisible(false), 2000);
      }
    };
    init();
  }, [fontsLoaded]);

  return (
    <RootSiblingParent>
      <View style={{ flex: 1 }}>
        <Slot />
        {(!fontsLoaded || splashVisible) && (
          <View style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}>
            <Image
              source={require('../assets/mabi-note-logo.png')}
              style={{ width: 250, height: 250, resizeMode: 'contain' }}
            />
          </View>
        )}
      </View>
    </RootSiblingParent>
  );
}
