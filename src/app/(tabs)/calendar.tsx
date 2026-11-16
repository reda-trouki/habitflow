
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ScreenContainer, {
  useAppTheme,
} from '@/components/ui/ScreenContainer';
import { COLORS } from '@/constants/colors';

const ACCENT = COLORS.primary;

const HABITS = [
  {
    id: '1',
    title: 'Morning pages',
    subtitle: 'Write for 10 minutes',
    icon: 'notebook-edit-outline',
    color: '#D69A45',
    time: '07:00 AM',
    completed: true,
  },
  {
    id: '2',
    title: 'Move your body',
    subtitle: 'Daily movement',
    icon: 'walk',
    color: '#4F9675',
    time: '08:30 AM',
    completed: true,
  },
  {
    id: '3',
    title: 'Read something',
    subtitle: 'Read 20 pages',
    icon: 'book-open-variant',
    color: '#5B63D3',
    time: '06:00 PM',
    completed: false,
  },
  {
    id: '4',
    title: 'Evening reset',
    subtitle: 'Reflect and prepare',
    icon: 'weather-night',
    color: '#D66B70',
    time: '09:00 PM',
    completed: false,
  },
] as const;

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const SAMPLE_ACTIVITY: Record<string, number> = {
  '2026-11-01': 2,
  '2026-11-02': 4,
  '2026-11-03': 3,
  '2026-11-04': 4,
  '2026-11-05': 2,
  '2026-11-06': 4,
  '2026-11-07': 3,
  '2026-11-08': 4,
  '2026-11-09': 4,
  '2026-11-10': 3,
  '2026-11-11': 4,
  '2026-11-12': 2,
  '2026-11-13': 4,
  '2026-11-14': 3,
  '2026-11-15': 4,
  '2026-11-16': 2,
};

const pad = (value: number) => String(value).padStart(2, '0');

const getDateKey = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

export default function CalendarScreen() {
  const { colors, isDark } = useAppTheme();

  const today = new Date();

  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    getDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Convert Sunday-first JS calendar to Monday-first.
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

  const calendarDays = useMemo(() => {
    const cells = Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [firstDay, daysInMonth]);

  const selectedDay = Number(selectedDate.slice(-2));
  const selectedMonth = Number(selectedDate.slice(5, 7)) - 1;
  const selectedYear = Number(selectedDate.slice(0, 4));

  const isCurrentMonth =
    selectedMonth === month && selectedYear === year;

  const isFutureDate = selectedDate >
    getDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const activityCount = SAMPLE_ACTIVITY[selectedDate] ?? 0;

  const completedHabits = isFutureDate
    ? []
    : HABITS.filter((habit, index) => {
        if (activityCount === 0) return false;
        return index < activityCount;
      });

  const completionPercent = Math.round(
    (completedHabits.length / HABITS.length) * 100
  );

  const changeMonth = (direction: number) => {
    const next = new Date(year, month + direction, 1);
    setViewDate(next);
    setSelectedDate(
      getDateKey(next.getFullYear(), next.getMonth(), 1)
    );
  };

  const goToToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(
      getDateKey(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const getActivityColor = (count: number) => {
    if (count === 0) return colors.subtle;
    if (count <= 1) return isDark ? '#34385D' : '#DDE0FF';
    if (count <= 2) return isDark ? '#454B89' : '#BFC5FA';
    if (count <= 3) return isDark ? '#555EAD' : '#929CF0';
    return ACCENT;
  };

  const SectionTitle = ({
    title,
    action,
  }: {
    title: string;
    action?: string;
  }) => (
    <View className="mb-4 flex-row items-center justify-between">
      <Text
        className="text-base font-bold"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      {action ? (
        <Text
          className="text-xs font-semibold"
          style={{ color: ACCENT }}
        >
          {action}
        </Text>
      ) : null}
    </View>
  );

  return (
    <ScreenContainer
      scroll
      paddingHorizontal={20}
      bottomPadding={125}
      contentContainerStyle={{ paddingTop: 12 }}
    >
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Text
            className="text-2xl font-bold tracking-tight"
            style={{ color: colors.text }}
          >
            Your calendar
          </Text>
          <Text
            className="mt-1 text-sm"
            style={{ color: colors.muted }}
          >
            Every small win adds up.
          </Text>
        </View>

        <Pressable
          onPress={goToToday}
          className="rounded-xl px-3 py-2"
          style={{ backgroundColor: colors.accentSoft }}
        >
          <Text
            className="text-xs font-bold"
            style={{ color: ACCENT }}
          >
            Today
          </Text>
        </Pressable>
      </View>

      {/* Monthly overview */}
      <View
        className="mb-5 rounded-3xl p-5"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {/* Month navigation */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              {MONTHS[month]} {year}
            </Text>
            <Text
              className="mt-1 text-xs"
              style={{ color: colors.muted }}
            >
              Your monthly activity
            </Text>
          </View>

          <View className="flex-row gap-2">
            {[-1, 1].map((direction) => (
              <Pressable
                key={direction}
                onPress={() => changeMonth(direction)}
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: colors.subtle }}
              >
                <MaterialCommunityIcons
                  name={direction === -1 ? 'chevron-left' : 'chevron-right'}
                  size={21}
                  color={colors.text}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Weekday labels */}
        <View className="mb-3 flex-row">
          {WEEKDAYS.map((day) => (
            <View key={day} className="flex-1 items-center">
              <Text
                className="text-[10px] font-semibold"
                style={{ color: colors.muted }}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View className="gap-y-2">
          {Array.from(
            { length: calendarDays.length / 7 },
            (_, weekIndex) => (
              <View key={weekIndex} className="flex-row">
                {calendarDays
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((day, dayIndex) => {
                    if (day === null) {
                      return (
                        <View
                          key={`empty-${dayIndex}`}
                          className="flex-1 items-center justify-center"
                          style={{ height: 43 }}
                        />
                      );
                    }

                    const dateKey = getDateKey(year, month, day);
                    const selected = dateKey === selectedDate;
                    const todayCell = isToday(day);
                    const count = SAMPLE_ACTIVITY[dateKey] ?? 0;

                    return (
                      <Pressable
                        key={dateKey}
                        onPress={() => setSelectedDate(dateKey)}
                        className="flex-1 items-center justify-center"
                        style={{ height: 43 }}
                      >
                        <View
                          className="h-9 w-9 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: selected
                              ? ACCENT
                              : todayCell
                              ? colors.accentSoft
                              : 'transparent',
                            borderWidth: todayCell && !selected ? 1 : 0,
                            borderColor: ACCENT,
                          }}
                        >
                          <Text
                            className="text-xs font-semibold"
                            style={{
                              color: selected
                                ? '#FFFFFF'
                                : todayCell
                                ? ACCENT
                                : colors.text,
                            }}
                          >
                            {day}
                          </Text>
                        </View>

                        {/* Activity indicator */}
                        <View
                          className="absolute bottom-0 h-1 w-1 rounded-full"
                          style={{
                            backgroundColor:
                              count > 0 && !selected
                                ? getActivityColor(count)
                                : 'transparent',
                          }}
                        />
                      </Pressable>
                    );
                  })}
              </View>
            )
          )}
        </View>

        {/* Legend */}
        <View
          className="mt-5 flex-row items-center justify-center gap-4 border-t pt-4"
          style={{ borderColor: colors.border }}
        >
          <View className="flex-row items-center gap-1.5">
            <View
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <Text className="text-[10px]" style={{ color: colors.muted }}>
              Completed
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors.subtle }}
            />
            <Text className="text-[10px]" style={{ color: colors.muted }}>
              No activity
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors.accentSoft }}
            />
            <Text className="text-[10px]" style={{ color: colors.muted }}>
              Today
            </Text>
          </View>
        </View>
      </View>

      {/* Monthly statistics */}
      <View className="mb-7 flex-row gap-3">
        <View
          className="flex-1 rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            className="mb-3 h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: colors.accentSoft }}
          >
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={20}
              color={ACCENT}
            />
          </View>
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            42
          </Text>
          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            Completed
          </Text>
        </View>

        <View
          className="flex-1 rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            className="mb-3 h-9 w-9 items-center justify-center rounded-xl"
            style={{
              backgroundColor: isDark
                ? 'rgba(229,180,107,0.13)'
                : '#FFF5E8',
            }}
          >
            <MaterialCommunityIcons
              name="fire"
              size={20}
              color={colors.warning}
            />
          </View>
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            05
          </Text>
          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            Best streak
          </Text>
        </View>

        <View
          className="flex-1 rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            className="mb-3 h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: colors.subtle }}
          >
            <MaterialCommunityIcons
              name="chart-line"
              size={20}
              color={colors.success}
            />
          </View>
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            78%
          </Text>
          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            Consistency
          </Text>
        </View>
      </View>

      {/* Selected day */}
      <SectionTitle
        title={
          isCurrentMonth
            ? `November ${selectedDay}`
            : `${MONTHS[selectedMonth]} ${selectedDay}`
        }
        action={`${completedHabits.length}/${HABITS.length} completed`}
      />

      {/* Daily progress */}
      <View
        className="mb-4 rounded-2xl p-4"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View className="mb-3 flex-row items-center justify-between">
          <Text
            className="text-sm font-semibold"
            style={{ color: colors.text }}
          >
            Daily progress
          </Text>
          <Text
            className="text-sm font-bold"
            style={{ color: ACCENT }}
          >
            {completionPercent}%
          </Text>
        </View>

        <View
          className="h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: colors.subtle }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${completionPercent}%`,
              backgroundColor: ACCENT,
            }}
          />
        </View>
      </View>

      {/* Habit agenda */}
      <View className="mb-4">
        {HABITS.map((habit) => {
          const completed = completedHabits.some(
            (item) => item.id === habit.id
          );

          return (
            <View
              key={habit.id}
              className="mb-3 flex-row items-center rounded-2xl p-4"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: isFutureDate ? 0.65 : 1,
              }}
            >
              <View
                className="h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${habit.color}18`,
                }}
              >
                <MaterialCommunityIcons
                  name={habit.icon}
                  size={21}
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
                  className="mt-1 text-xs"
                  style={{ color: colors.muted }}
                >
                  {habit.time} · {habit.subtitle}
                </Text>
              </View>

              <View
                className="h-7 w-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: completed
                    ? colors.success
                    : colors.subtle,
                }}
              >
                <MaterialCommunityIcons
                  name={
                    completed
                      ? 'check'
                      : isFutureDate
                      ? 'clock-outline'
                      : 'minus'
                  }
                  size={15}
                  color={completed ? '#FFFFFF' : colors.inactive}
                />
              </View>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}
