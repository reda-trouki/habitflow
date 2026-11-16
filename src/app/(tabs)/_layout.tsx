
import {
  View,
  StyleSheet,
} from 'react-native';

import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';









export default function TabsLayout() {
  return (
    <View style={styles.root}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
          tabBar={(props) => (
            <TabBar
              {...props}
            />
          )}
        >
          <Tabs.Screen
            name="index"
            options={{ title: 'Home' }}
          />

          <Tabs.Screen
            name="insights"
            options={{ title: 'Insights' }}
          />

          <Tabs.Screen
            name="calendar"
            options={{ title: 'Calendar' }}
          />

          <Tabs.Screen
            name="profile"
            options={{ title: 'Profile' }}
          />
        </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
