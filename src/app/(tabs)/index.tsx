
import { useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Host, Switch } from '@expo/ui';
import { useRouter } from 'expo-router';

import ScreenContainer, {
  useAppTheme,
} from '@/components/ui/ScreenContainer';

import { COLORS } from '@/constants/colors';

type Habit = {
  id: number;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  time: string;
  color: string;
  completed: boolean;
};

const INITIAL_HABITS: Habit[] = [
  {
    id: 1,
    title: 'Morning pages',
    subtitle: 'Write for 10 minutes',
    icon: 'notebook-edit-outline',
    time: '7:00 AM',
    color: '#D9A66D',
    completed: true,
  },
  {
    id: 2,
    title: 'Move your body',
    subtitle: 'A little movement counts',
    icon: 'walk',
    time: '8:30 AM',
    color: '#7B9B83',
    completed: true,
  },
  {
    id: 3,
    title: 'Read something',
    subtitle: '10 pages of a good book',
    icon: 'book-open-page-variant-outline',
    time: '6:00 PM',
    color: '#8D87BD',
    completed: false,
  },
  {
    id: 4,
    title: 'Evening reset',
    subtitle: 'Reflect and plan tomorrow',
    icon: 'weather-night',
    time: '9:00 PM',
    color: '#C58D8D',
    completed: false,
  },
];

const WEEK_DAYS = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: false },
  { day: 'S', done: false },
];

const HomeScreen = () => {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [focusMode, setFocusMode] = useState(false);

  const completedCount = habits.filter(
    habit => habit.completed,
  ).length;

  const progress = habits.length
    ? completedCount / habits.length
    : 0;

  const visibleHabits = focusMode
    ? habits.filter(habit => !habit.completed)
    : habits;

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).format(new Date()),
    [],
  );

  const accent = COLORS.primary;

  const toggleHabit = (id: number) => {
    setHabits(current =>
      current.map(habit =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    );
  };

  return (
    <ScreenContainer
      scroll
      paddingHorizontal={20}
      bottomPadding={130}
      contentContainerStyle={{ paddingTop: 12 }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View
              className="mr-2 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colors.success }}
            />
            <Text
              className="text-[11px] font-semibold uppercase tracking-[2px]"
              style={{ color: colors.muted }}
            >
              {dateLabel}
            </Text>
          </View>

          <Text
            className="mt-3 text-[30px] font-bold leading-9 tracking-tight"
            style={{ color: colors.text }}
          >
            Make today
            {'\n'}
            <Text style={{ color: accent }}>
              count.
            </Text>
          </Text>

          <Text
            className="mt-2 text-[13px]"
            style={{ color: colors.muted }}
          >
            A little progress goes a long way.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          className="h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={21}
            color={colors.text}
          />
          <View
            className="absolute right-3 top-3 h-2 w-2 rounded-full"
            style={{ backgroundColor: '#E28A72' }}
          />
        </Pressable>
      </View>


      {/* Streak card */}
      <View
        className="mt-7 overflow-hidden rounded-3xl p-5"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1 flex-row items-center gap-3">
            <View
              className="h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: isDark
                  ? 'rgba(229, 180, 107, 0.14)'
                  : '#FFF5E8',
              }}
            >
              <MaterialCommunityIcons
                name="fire"
                size={23}
                color="#E29A55"
              />
            </View>

            <View className="min-w-0 flex-1">
              <Text
                numberOfLines={1}
                className="text-sm font-bold"
                style={{ color: colors.text }}
              >
                You're on a roll
              </Text>
              <Text
                numberOfLines={1}
                className="mt-1 text-xs"
                style={{ color: colors.muted }}
              >
                Keep your momentum going.
              </Text>
            </View>
          </View>

          {/* Streak count */}
          <View className="shrink-0 items-end">
            <View className="flex-row items-baseline">
              <Text
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                05
              </Text>
              <Text
                className="ml-1 text-xs font-medium"
                style={{ color: colors.muted }}
              >
                days
              </Text>
            </View>
            <Text
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: colors.muted }}
            >
              Current streak
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View
          className="my-5 h-px"
          style={{ backgroundColor: colors.border }}
        />

        {/* Weekly activity */}
        <View className="flex-row justify-between">
          {WEEK_DAYS.map((item, index) => (
            <View key={index} className="flex-1 items-center gap-2">
              <Text
                className="text-[10px] font-semibold"
                style={{ color: colors.muted }}
              >
                {item.day}
              </Text>

              <View
                className="h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor: item.done ? accent : colors.subtle,
                  borderWidth: item.done ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                {item.done ? (
                  <MaterialCommunityIcons
                    name="check"
                    size={15}
                    color="#FFFFFF"
                  />
                ) : (
                  <View
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: colors.inactive }}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>


      {/* Editorial inspiration card */}
      <View className="mt-7 h-52.5 overflow-hidden rounded-[26px]">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=90',
          }}
          contentFit="cover"
          contentPosition="center"
          transition={400}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />

        <View
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(15, 20, 27, 0.43)',
          }}
        />

        <View className="flex-1 justify-between p-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center rounded-full border border-white/20 bg-black/20 px-3 py-2">
              <View className="mr-2 h-1.5 w-1.5 rounded-full bg-[#C9D6A9]" />
              <Text className="text-[9px] font-bold uppercase tracking-[1.7px] text-white">
                A NOTE FOR TODAY
              </Text>
            </View>

            <View className="h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15">
              <MaterialCommunityIcons
                name="weather-sunset"
                size={20}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View>
            <Text className="text-[27px] font-bold leading-8 tracking-tight text-white">
              Consistency
              {'\n'}
              over perfection.
            </Text>

            <Text className="mt-2 max-w-62.5 text-xs leading-4.5 text-white/85">
              Small steps, repeated daily, create remarkable change.
            </Text>
          </View>
        </View>
      </View>

      {/* Progress section */}
      <View className="mt-8">
        <View className="flex-row items-center justify-between">
          <View>
            <Text
              className="text-xl font-bold"
              style={{ color: colors.text }}
            >
              Daily overview
            </Text>
            <Text
              className="mt-1 text-xs"
              style={{ color: colors.muted }}
            >
              You're making it happen.
            </Text>
          </View>

          <View
            className="rounded-xl px-3 py-2"
            style={{ backgroundColor: colors.accentSoft }}
          >
            <Text
              className="text-sm font-bold"
              style={{ color: accent }}
            >
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>

        <View
          className="mt-4 h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: colors.subtle }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progress * 100}%`,
              backgroundColor: accent,
            }}
          />
        </View>

        <View className="mt-3 flex-row justify-between">
          <Text
            className="text-[11px]"
            style={{ color: colors.muted }}
          >
            {completedCount} of {habits.length} completed
          </Text>
          <Text
            className="text-[11px] font-medium"
            style={{ color: colors.success }}
          >
            {habits.length - completedCount} remaining
          </Text>
        </View>
      </View>

      {/* Daily habits */}
      <View className="mt-9">
        <View className="flex-row items-center justify-between">
          <View>
            <Text
              className="text-xl font-bold"
              style={{ color: colors.text }}
            >
              Your rituals
            </Text>
            <Text
              className="mt-1 text-xs"
              style={{ color: colors.muted }}
            >
              Make time for what matters.
            </Text>
          </View>

          <Pressable
            onPress={() => router.navigate('/(tabs)/calendar')}
            className="flex-row items-center rounded-full px-3 py-2"
            style={{ backgroundColor: colors.accentSoft }}
          >
            <Text
              className="mr-1 text-[11px] font-bold"
              style={{ color: accent }}
            >
              View all
            </Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={14}
              color={accent}
            />
          </Pressable>
        </View>

        {/* Focus mode */}
        <View
          className="mt-5 flex-row items-center justify-between rounded-2xl px-4 py-3"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center">
            <View
              className="mr-3 h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: colors.accentSoft }}
            >
              <MaterialCommunityIcons
                name="target"
                size={19}
                color={accent}
              />
            </View>

            <View>
              <Text
                className="text-xs font-bold"
                style={{ color: colors.text }}
              >
                Focus mode
              </Text>
              <Text
                className="mt-1 text-[10px]"
                style={{ color: colors.muted }}
              >
                Show only unfinished habits
              </Text>
            </View>
          </View>

          <Host
            matchContents
            colorScheme={isDark ? 'dark' : 'light'}
            seedColor={COLORS.primary}
          >
            <Switch
              value={focusMode}
              onValueChange={setFocusMode}
            />
          </Host>
        </View>

        {/* Habit cards */}
        <View className="mt-3 gap-3">
          {visibleHabits.map(habit => (
            <Pressable
              key={habit.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: habit.completed }}
              onPress={() => toggleHabit(habit.id)}
              className="flex-row items-center rounded-[20px] p-4"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View
                className="mr-4 h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: `${habit.color}20`,
                }}
              >
                <MaterialCommunityIcons
                  name={habit.icon}
                  size={22}
                  color={habit.color}
                />
              </View>

              <View className="flex-1">
                <Text
                  className="text-[13px] font-bold"
                  style={{
                    color: colors.text,
                    textDecorationLine: habit.completed
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {habit.title}
                </Text>

                <Text
                  className="mt-1 text-[11px]"
                  style={{ color: colors.muted }}
                >
                  {habit.subtitle}
                </Text>

                <View className="mt-2 flex-row items-center">
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={12}
                    color={colors.muted}
                  />
                  <Text
                    className="ml-1 text-[10px]"
                    style={{ color: colors.muted }}
                  >
                    {habit.time}
                  </Text>
                </View>
              </View>

              <View
                className="h-7 w-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: habit.completed
                    ? accent
                    : 'transparent',
                  borderWidth: habit.completed ? 0 : 1.5,
                  borderColor: colors.border,
                }}
              >
                {habit.completed && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color="#FFFFFF"
                  />
                )}
              </View>
            </Pressable>
          ))}

          {visibleHabits.length === 0 && (
            <View
              className="items-center rounded-[20px] px-5 py-8"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <MaterialCommunityIcons
                name="check-decagram-outline"
                size={34}
                color={colors.success}
              />
              <Text
                className="mt-3 text-sm font-bold"
                style={{ color: colors.text }}
              >
                Everything is done.
              </Text>
              <Text
                className="mt-1 text-xs"
                style={{ color: colors.muted }}
              >
                Enjoy the rest of your day.
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Closing note */}
      <View
        className="mt-7 flex-row items-center rounded-2xl p-4"
        style={{ backgroundColor: colors.accentSoft }}
      >
        <MaterialCommunityIcons
          name="sprout"
          size={23}
          color={accent}
        />
        <Text
          className="ml-3 flex-1 text-[11px] leading-[18px]"
          style={{ color: colors.text }}
        >
          Progress isn't always loud. Sometimes it's simply showing up again.
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;
