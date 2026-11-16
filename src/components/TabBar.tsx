
import {
  View,
  Text,
  useColorScheme,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Href, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from 'expo-router/build/layouts/TabsClient.js';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useEffect, useState } from 'react';

import { COLORS } from '@/constants/colors';
import { TAB_ICONS } from '@/constants/tabIcons';

type TabName = keyof typeof TAB_ICONS;

const INDICATOR_WIDTH = 22;

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 190,
  mass: 0.7,
};

const TabBar = ({ state, descriptors }: BottomTabBarProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';

  const theme = isDark ? COLORS.dark : COLORS.light;

  const [barWidth, setBarWidth] = useState(0);

  const tabRoutes: Record<string, Href> = {
    index: '/(tabs)',
    insights: '/(tabs)/insights',
    calendar: '/(tabs)/calendar',
    profile: '/(tabs)/profile',
  };

  const visibleRoutes = state.routes.filter(
    route => TAB_ICONS[route.name as TabName],
  );

  const tabWidth = visibleRoutes.length
    ? barWidth / visibleRoutes.length
    : 0;

  const activeTabIndex = visibleRoutes.findIndex(
    route => route.key === state.routes[state.index]?.key,
  );

  const indicatorPosition = useSharedValue(0);

  useEffect(() => {
    if (!tabWidth || activeTabIndex < 0) return;

    indicatorPosition.value = withSpring(
      activeTabIndex * tabWidth +
        (tabWidth - INDICATOR_WIDTH) / 2,
      SPRING_CONFIG,
    );
  }, [activeTabIndex, tabWidth]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 10) + 8,
        },
      ]}
    >
      <View style={styles.row}>
        {/* Navigation bar */}
        <View
          onLayout={event =>
            setBarWidth(event.nativeEvent.layout.width)
          }
          style={[
            styles.tabBar,
            {
              backgroundColor: theme.tabBackground,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          {visibleRoutes.map(route => {
            const focused =
              state.routes[state.index]?.key === route.key;

            const options = descriptors[route.key].options;
            const tabName = route.name as TabName;
            const icon = TAB_ICONS[tabName];

            const label =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : options.title ?? route.name;

            const color = focused
              ? COLORS.primary
              : theme.inactive;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={
                  options.tabBarAccessibilityLabel
                }
                onPress={() => {
                  const href = tabRoutes[route.name];

                  if (href && !focused) {
                    router.navigate(href);
                  }
                }}
                style={({ pressed }) => [
                  styles.tab,
                  pressed && styles.tabPressed,
                ]}
              >
                <MaterialCommunityIcons
                  name={focused ? icon.active : icon.inactive}
                  size={23}
                  color={color}
                />

                <Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    { color },
                    focused && styles.activeLabel,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}

          {/* Animated active indicator */}
          {barWidth > 0 && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.indicator,
                {
                  backgroundColor: COLORS.primary,
                },
                animatedIndicatorStyle,
              ]}
            />
          )}
        </View>

        {/* Add habit */}
        <Pressable
          onPress={() => router.push('/habit/new')}
          accessibilityRole="button"
          accessibilityLabel="Add a new habit"
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: COLORS.primary,
              borderColor: theme.background,
              shadowColor: theme.addShadow,
            },
            pressed && styles.addButtonPressed,
          ]}
        >
          <MaterialCommunityIcons
            name="plus"
            size={29}
            color="#FFFFFF"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  tabBar: {
    flex: 1,
    height: 70,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',

    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 5,
  },

  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  tabPressed: {
    opacity: 0.65,
  },

  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  activeLabel: {
    fontWeight: '700',
  },

  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 5,
    width: INDICATOR_WIDTH,
    height: 3,
    borderRadius: 3,
  },

  addButton: {
    width: 58,
    height: 58,
    borderRadius: 21,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 10,
    elevation: 6,
  },

  addButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.94 }],
  },
});
