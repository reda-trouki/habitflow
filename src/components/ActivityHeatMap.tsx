import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '@/components/ui/ScreenContainer';
import { COLORS } from '@/constants/colors';

type HabitActivityHeatmapProps = {
  // Example: { '2026-11-16': 3, '2026-11-15': 2 }
  completionsByDate: Record<string, number>;
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CELL_SIZE = 12;
const CELL_GAP = 3;
const WEEK_WIDTH = CELL_SIZE + CELL_GAP;

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getMonday = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  const day = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - day);

  return result;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function ActivityHeatmap({
  completionsByDate,
}: HabitActivityHeatmapProps) {
  const { colors, isDark } = useAppTheme();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayKey = getDateKey(today);

  const [selectedDate, setSelectedDate] = useState(todayKey);

  const {
    weeks,
    activeDays,
    totalCompletions,
  } = useMemo(() => {
    const currentMonday = getMonday(today);
    const startDate = new Date(currentMonday);

    // 52 previous weeks + the current week
    startDate.setDate(startDate.getDate() - 52 * 7);

    const generatedWeeks = [];
    let activeDaysCount = 0;
    let completionCount = 0;

    for (let week = 0; week < 53; week++) {
      const days = [];

      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + week * 7 + day);

        const key = getDateKey(date);
        const count = completionsByDate[key] ?? 0;
        const isFuture = date > today;

        if (!isFuture && count > 0) {
          activeDaysCount++;
          completionCount += count;
        }

        days.push({
          date,
          key,
          count,
          isFuture,
          monthLabel:
            date.getDate() === 1
              ? date.toLocaleDateString(undefined, { month: 'short' })
              : '',
        });
      }

      generatedWeeks.push(days);
    }

    return {
      weeks: generatedWeeks,
      activeDays: activeDaysCount,
      totalCompletions: completionCount,
    };
  }, [completionsByDate]);

  const selectedDay = weeks
    .flat()
    .find((day) => day.key === selectedDate);

  const getCellColor = (count: number) => {
    if (count === 0) return colors.subtle;

    if (isDark) {
      if (count === 1) return 'rgba(91, 99, 211, 0.35)';
      if (count === 2) return 'rgba(91, 99, 211, 0.55)';
      if (count === 3) return 'rgba(91, 99, 211, 0.78)';
      return COLORS.primary;
    }

    if (count === 1) return '#E0E3FA';
    if (count === 2) return '#B9C0F1';
    if (count === 3) return '#8994E5';

    return COLORS.primary;
  };

  return (
    <View
      className="rounded-3xl p-4"
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text
            className="text-base font-semibold"
            style={{ color: colors.text }}
          >
            Habit activity
          </Text>

          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            Your consistency over the last year
          </Text>
        </View>

        <View
          className="rounded-xl px-3 py-2"
          style={{ backgroundColor: colors.accentSoft }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: COLORS.primary }}
          >
            Last year
          </Text>
        </View>
      </View>

      {/* Statistics */}
      <View className="mt-5 flex-row">
        <View className="flex-1">
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            {totalCompletions.toLocaleString()}
          </Text>

          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            Total completions
          </Text>
        </View>

        <View
          style={{
            width: 1,
            backgroundColor: colors.border,
            marginHorizontal: 16,
          }}
        />

        <View className="flex-1">
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            {activeDays}
          </Text>

          <Text
            className="mt-1 text-xs"
            style={{ color: colors.muted }}
          >
            Active days
          </Text>
        </View>
      </View>

      {/* Heatmap */}
      <View className="mt-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 4 }}
        >
          <View>
            {/* Month labels */}
            <View className="mb-2 flex-row">
              <View style={{ width: 28 }} />

              {weeks.map((week, index) => {
                const label = week.find((day) => day.monthLabel)?.monthLabel;

                return (
                  <View
                    key={`month-${index}`}
                    style={{ width: WEEK_WIDTH, overflow: 'visible' }}
                  >
                    {label ? (
                      <Text
                        numberOfLines={1}
                        style={{
                          color: colors.muted,
                          fontSize: 10,
                          width: 32,
                        }}
                      >
                        {label}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>

            {/* Weekday labels + activity cells */}
            <View className="flex-row">
              <View
                className="justify-between"
                style={{
                  width: 28,
                  height: 7 * CELL_SIZE + 6 * CELL_GAP,
                  paddingRight: 5,
                }}
              >
                {DAY_LABELS.map((day, index) => (
                  <View
                    key={day}
                    style={{
                      height: CELL_SIZE,
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? (
                      <Text
                        style={{
                          fontSize: 9,
                          color: colors.muted,
                        }}
                      >
                        {day}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>

              {weeks.map((week, weekIndex) => (
                <View
                  key={`week-${weekIndex}`}
                  style={{ marginRight: CELL_GAP }}
                  className="gap-[3px]"
                >
                  {week.map((day) => {
                    const isSelected = selectedDate === day.key;

                    return (
                      <Pressable
                        key={day.key}
                        disabled={day.isFuture}
                        onPress={() => setSelectedDate(day.key)}
                        accessibilityRole="button"
                        accessibilityLabel={`${formatDate(day.date)}, ${day.count} habits completed`}
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          borderRadius: 3,
                          backgroundColor: day.isFuture
                            ? 'transparent'
                            : getCellColor(day.count),
                          borderWidth: isSelected ? 1.5 : 0,
                          borderColor: colors.text,
                        }}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Legend */}
      <View className="mt-4 flex-row items-center justify-end gap-1.5">
        <Text style={{ color: colors.muted, fontSize: 10 }}>
          Less
        </Text>

        {[0, 1, 2, 3, 4].map((level) => (
          <View
            key={level}
            style={{
              width: 11,
              height: 11,
              borderRadius: 3,
              backgroundColor: getCellColor(level),
            }}
          />
        ))}

        <Text style={{ color: colors.muted, fontSize: 10 }}>
          More
        </Text>
      </View>

      {/* Selected day */}
      <View
        className="mt-4 rounded-2xl p-3"
        style={{ backgroundColor: colors.subtle }}
      >
        <Text
          className="text-xs font-medium"
          style={{ color: colors.muted }}
        >
          {selectedDay
            ? formatDate(selectedDay.date)
            : 'Select a day'}
        </Text>

        <Text
          className="mt-1 text-sm font-semibold"
          style={{ color: colors.text }}
        >
          {selectedDay
            ? selectedDay.count === 0
              ? 'No habits completed'
              : `${selectedDay.count} ${selectedDay.count === 1 ? 'habit' : 'habits'} completed`
            : 'No activity data'}
        </Text>
      </View>
    </View>
  );
}