import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from "@/constants/colors";
import { useAppTheme } from '../components/ui/ScreenContainer';

export default function RootLayout() {
  const { colors } = useAppTheme();
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
