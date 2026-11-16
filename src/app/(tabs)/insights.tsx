
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ScreenContainer, {
  useAppTheme,
} from '@/components/ui/ScreenContainer';
import { COLORS } from '@/constants/colors';
import ActivityHeatmap from '@/components/ActivityHeatMap';

const ACCENT = COLORS.primary;

const PERIODS = ['Week', 'Month', 'Year'] as const;
type Period = (typeof PERIODS)[number];

const HABITS = [
  {
    id: '1',
    title: 'Morning pages',
    category: 'Writing',
    icon: 'notebook-edit-outline',
    color: '#D69A45',
    completed: 24,
    total: 28,
    streak: 12,
  },
  {
    id: '2',
    title: 'Move your body',
    category: 'Fitness',
    icon: 'walk',
    color: '#4F9675',
    completed: 21,
    total: 28,
    streak: 8,
  },
  {
    id: '3',
    title: 'Read something',
    category: 'Learning',
    icon: 'book-open-variant',
    color: '#5B63D3',
    completed: 18,
    total: 28,
    streak: 5,
  },
  {
    id: '4',
    title: 'Evening reset',
    category: 'Mindfulness',
    icon: 'weather-night',
    color: '#D66B70',
    completed: 15,
    total: 28,
    streak: 3,
  },
] as const;

const WEEKLY_DATA = [
  { day: 'M', value: 65 },
  { day: 'T', value: 85 },
  { day: 'W', value: 55 },
  { day: 'T', value: 100 },
  { day: 'F', value: 75 },
  { day: 'S', value: 45 },
  { day: 'S', value: 70 },
];

const ACTIVITY_DATA: Record<string, number> = {
  '2026-11-16': 4,
  '2026-11-15': 2,
  '2026-11-14': 3,
  '2026-11-13': 1,
  '2026-11-12': 4,
  '2026-11-11': 2,
  '2026-11-10': 3,
  '2026-11-09': 1,
  '2026-11-08': 2,
  '2026-11-07': 4,
  '2026-11-06': 3,
  '2026-11-05': 2,
  '2026-11-04': 1,
  '2026-11-03': 3,
  '2026-11-02': 2,
  '2026-11-01': 4,
};

export default function InsightsScreen() {
  const { colors, isDark } = useAppTheme();
  const [period, setPeriod] = useState<Period>('Week');

  const totalCompleted = HABITS.reduce(
    (sum, habit) => sum + habit.completed,
    0
  );

  const totalPossible = HABITS.reduce(
    (sum, habit) => sum + habit.total,
    0
  );

  const consistency = Math.round(
    (totalCompleted / totalPossible) * 100
  );

  const bestHabit = useMemo(
    () =>
      [...HABITS].sort(
        (a, b) =>
          b.completed / b.total - a.completed / a.total
      )[0],
    []
  );

  

  const cardStyle = {
    backgroundColor: colors.surface,
    borderWidth: 1 as const,
    borderColor: colors.border,
  };

  const SectionHeader = ({
    title,
    subtitle,
    action,
  }: {
    title: string;
    subtitle?: string;
    action?: string;
  }) => (
    <View className="mb-4 flex-row items-end justify-between">
      <View className="flex-1">
        <Text
          className="text-base font-bold"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {action && (
        <Text
          className="text-xs font-semibold"
          style={{ color: ACCENT }}
        >
          {action}
        </Text>
      )}
    </View>
  );

  return (
    <ScreenContainer
      scroll
      paddingHorizontal={20}
      bottomPadding={130}
      contentContainerStyle={{ paddingTop: 12 }}
    >
      {/* Header */}
      <View className="mb-7 flex-row items-center justify-between">
        <View>
          <Text
            className="text-2xl font-bold tracking-tight"
            style={{ color: colors.text }}
          >
            Insights
          </Text>
          <Text
            className="mt-1 text-sm"
            style={{ color: colors.muted }}
          >
            Your progress, beautifully measured.
          </Text>
        </View>

        <View
          className="h-11 w-11 items-center justify-center rounded-2xl"
          style={cardStyle}
        >
          <MaterialCommunityIcons
            name="chart-timeline-variant"
            size={22}
            color={ACCENT}
          />
        </View>
      </View>

      {/* Consistency hero */}
      <View
        className="mb-6 overflow-hidden rounded-3xl p-5"
        style={{
          backgroundColor: isDark ? '#20263B' : '#EEF0FF',
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View
              className="h-7 w-7 items-center justify-center rounded-lg"
              style={{
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.09)'
                  : 'rgba(91,99,211,0.10)',
              }}
            >
              <MaterialCommunityIcons
                name="chart-box-outline"
                size={16}
                color={isDark ? '#BFC4FF' : ACCENT}
              />
            </View>

            <Text
              className="text-xs font-semibold"
              style={{ color: isDark ? '#C3C8DD' : '#646B9A' }}
            >
              CONSISTENCY SCORE
            </Text>
          </View>

          <View
            className="rounded-full px-3 py-1.5"
            style={{
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(91,99,211,0.09)',
            }}
          >
            <Text
              className="text-[10px] font-bold"
              style={{ color: isDark ? '#D1D5FF' : ACCENT }}
            >
              {period.toUpperCase()}
            </Text>
          </View>
        </View>

        <View className="mt-6 flex-row items-end justify-between">
          <View>
            <View className="flex-row items-baseline">
              <Text
                className="text-[54px] font-bold tracking-tight"
                style={{ color: colors.text, lineHeight: 62 }}
              >
                {consistency}
              </Text>
              <Text
                className="ml-1 text-2xl font-semibold"
                style={{ color: colors.muted }}
              >
                %
              </Text>
            </View>

            <Text
              className="mt-1 text-xs"
              style={{ color: colors.muted }}
            >
              Your habits are becoming consistent.
            </Text>
          </View>

          <View
            className="mb-2 h-[76px] w-[76px] items-center justify-center rounded-full"
            style={{
              borderWidth: 7,
              borderColor: isDark
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(91,99,211,0.13)',
              borderTopColor: ACCENT,
              borderRightColor: ACCENT,
              transform: [{ rotate: '35deg' }],
            }}
          >
            <View style={{ transform: [{ rotate: '-35deg' }] }}>
              <MaterialCommunityIcons
                name="trending-up"
                size={25}
                color={ACCENT}
              />
            </View>
          </View>
        </View>

        <View
          className="mt-6 h-1.5 overflow-hidden rounded-full"
          style={{
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.10)'
              : 'rgba(91,99,211,0.13)',
          }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${consistency}%`,
              backgroundColor: ACCENT,
            }}
          />
        </View>

        <View className="mt-3 flex-row justify-between">
          <Text
            className="text-[10px]"
            style={{ color: colors.muted }}
          >
            {totalCompleted} completed sessions
          </Text>
          <Text
            className="text-[10px]"
            style={{ color: colors.muted }}
          >
            {totalPossible} planned
          </Text>
        </View>

        {/* Period selector */}
        <View
          className="mt-5 flex-row rounded-xl p-1"
          style={{
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(255,255,255,0.65)',
          }}
        >
          {PERIODS.map((item) => {
            const selected = period === item;

            return (
              <Pressable
                key={item}
                onPress={() => setPeriod(item)}
                className="flex-1 items-center rounded-lg py-2"
                style={{
                  backgroundColor: selected
                    ? colors.surface
                    : 'transparent',
                }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{
                    color: selected ? colors.text : colors.muted,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ActivityHeatmap
        completionsByDate={ACTIVITY_DATA}
      />

      {/* Key metrics */}
      <View className="mb-7 flex-row gap-3">
        <View
          className="flex-1 rounded-2xl p-4"
          style={cardStyle}
        >
          <View className="flex-row items-center justify-between">
            <Text
              className="text-xs font-medium"
              style={{ color: colors.muted }}
            >
              Completed
            </Text>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={18}
              color={colors.success}
            />
          </View>

          <Text
            className="mt-3 text-3xl font-bold"
            style={{ color: colors.text }}
          >
            {totalCompleted}
          </Text>

          <Text
            className="mt-1 text-[10px]"
            style={{ color: colors.muted }}
          >
            Habit sessions
          </Text>
        </View>

        <View
          className="flex-1 rounded-2xl p-4"
          style={cardStyle}
        >
          <View className="flex-row items-center justify-between">
            <Text
              className="text-xs font-medium"
              style={{ color: colors.muted }}
            >
              Best streak
            </Text>
            <MaterialCommunityIcons
              name="fire"
              size={18}
              color={colors.warning}
            />
          </View>

          <View className="mt-3 flex-row items-baseline">
            <Text
              className="text-3xl font-bold"
              style={{ color: colors.text }}
            >
              12
            </Text>
            <Text
              className="ml-1 text-xs"
              style={{ color: colors.muted }}
            >
              days
            </Text>
          </View>

          <Text
            className="mt-1 text-[10px]"
            style={{ color: colors.muted }}
          >
            Personal record
          </Text>
        </View>
      </View>

      {/* Activity chart */}
      <SectionHeader
        title="Activity"
        subtitle="A look at your daily rhythm."
        action="This week"
      />

      <View
        className="mb-7 rounded-3xl p-5"
        style={cardStyle}
      >
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              74%
            </Text>
            <Text
              className="mt-1 text-xs"
              style={{ color: colors.muted }}
            >
              Average completion
            </Text>
          </View>

          <View
            className="flex-row items-center gap-1.5 rounded-full px-2.5 py-1.5"
            style={{
              backgroundColor: isDark
                ? 'rgba(79,150,117,0.14)'
                : '#EAF5EF',
            }}
          >
            <MaterialCommunityIcons
              name="trending-up"
              size={14}
              color={colors.success}
            />
            <Text
              className="text-[10px] font-bold"
              style={{ color: colors.success }}
            >
              +8%
            </Text>
          </View>
        </View>

        <View className="h-32 flex-row items-end justify-between">
          {WEEKLY_DATA.map((item, index) => (
            <View
              key={index}
              className="flex-1 items-center gap-3"
            >
              <View
                className="w-5 overflow-hidden rounded-full"
                style={{
                  height: 100,
                  backgroundColor: colors.subtle,
                  justifyContent: 'flex-end',
                }}
              >
                <View
                  className="w-full rounded-full"
                  style={{
                    height: `${item.value}%`,
                    backgroundColor:
                      index === 3 ? ACCENT : `${ACCENT}88`,
                  }}
                />
              </View>

              <Text
                className="text-[10px] font-medium"
                style={{ color: colors.muted }}
              >
                {item.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Habit performance */}
      <SectionHeader
        title="Your habits"
        subtitle="Consistency across your routines."
        action="4 habits"
      />

      <View
        className="mb-7 overflow-hidden rounded-3xl"
        style={cardStyle}
      >
        {HABITS.map((habit, index) => {
          const percentage = Math.round(
            (habit.completed / habit.total) * 100
          );

          return (
            <View
              key={habit.id}
              className="p-4"
              style={{
                borderBottomWidth:
                  index === HABITS.length - 1 ? 0 : 1,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${habit.color}18`,
                  }}
                >
                  <MaterialCommunityIcons
                    name={habit.icon}
                    size={20}
                    color={habit.color}
                  />
                </View>

                <View className="ml-3 flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: colors.text }}
                  >
                    {habit.title}
                  </Text>
                  <Text
                    className="mt-1 text-[10px]"
                    style={{ color: colors.muted }}
                  >
                    {habit.category}
                  </Text>
                </View>

                <View className="items-end">
                  <Text
                    className="text-sm font-bold"
                    style={{ color: colors.text }}
                  >
                    {percentage}%
                  </Text>
                  <Text
                    className="mt-1 text-[10px]"
                    style={{ color: colors.muted }}
                  >
                    {habit.streak} day streak
                  </Text>
                </View>
              </View>

              <View
                className="mt-3 h-1 overflow-hidden rounded-full"
                style={{ backgroundColor: colors.subtle }}
              >
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: habit.color,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Personal insight */}
      <View
        className="mb-5 rounded-3xl p-5"
        style={{
          backgroundColor: isDark ? '#20263B' : '#EEF0FF',
        }}
      >
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={19}
            color={ACCENT}
          />
          <Text
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: ACCENT }}
          >
            A little insight
          </Text>
        </View>

        <Text
          className="mt-3 text-lg font-bold leading-6"
          style={{ color: colors.text }}
        >
          {bestHabit.title} is your strongest habit.
        </Text>

        <Text
          className="mt-2 text-xs leading-5"
          style={{ color: colors.muted }}
        >
          You completed it {bestHabit.completed} times out of{' '}
          {bestHabit.total}. Keep building on this momentum.
        </Text>
      </View>

      {/* Footer */}
      <View className="mb-4 items-center py-3">
        <MaterialCommunityIcons
          name="sprout-outline"
          size={23}
          color={colors.success}
        />
        <Text
          className="mt-2 text-xs font-semibold"
          style={{ color: colors.text }}
        >
          Progress, not perfection.
        </Text>
      </View>
    </ScreenContainer>
  );
}
