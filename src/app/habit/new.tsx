
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Host, Switch } from '@expo/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ScreenContainer, {
  useAppTheme,
} from '@/components/ui/ScreenContainer';
import { COLORS } from '@/constants/colors';

const ACCENT = COLORS.primary;

const ICONS = [
  'book-open-variant',
  'dumbbell',
  'meditation',
  'water-outline',
  'walk',
  'food-apple-outline',
  'sleep',
  'code-braces',
  'brain',
  'heart-outline',
  'pencil-outline',
  'leaf',
] as const;

const HABIT_COLORS = [
  '#5B63D3',
  '#4F9675',
  '#D69A45',
  '#D66B70',
  '#4196A8',
  '#9672C8',
  '#D17D9B',
  '#68778F',
];

const DAYS = [
  { label: 'M', value: 'Mon' },
  { label: 'T', value: 'Tue' },
  { label: 'W', value: 'Wed' },
  { label: 'T', value: 'Thu' },
  { label: 'F', value: 'Fri' },
  { label: 'S', value: 'Sat' },
  { label: 'S', value: 'Sun' },
];

type HabitIcon = (typeof ICONS)[number];

export default function CreateHabitScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] =
    useState<HabitIcon>('book-open-variant');
  const [selectedColor, setSelectedColor] =
    useState(ACCENT);
  const [selectedDays, setSelectedDays] = useState<string[]>([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ]);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('08:00 AM');

  const inputBackground = colors.subtle;

  const isValid = name.trim().length > 0;

  const frequencyLabel = useMemo(() => {
    if (selectedDays.length === 7) return 'Every day';
    if (selectedDays.length === 5) return 'Weekdays';
    if (selectedDays.length === 2 &&
        selectedDays.includes('Sat') &&
        selectedDays.includes('Sun')) return 'Weekends';

    return `${selectedDays.length} days per week`;
  }, [selectedDays]);

  const toggleDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    );
  };

  const handleCreate = () => {
    if (!isValid) {
      Alert.alert('Habit name required', 'Give your habit a name first.');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert(
        'Choose your schedule',
        'Select at least one day for this habit.'
      );
      return;
    }

    // Connect this to your habit store or API.
    const newHabit = {
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
      color: selectedColor,
      days: selectedDays,
      reminderEnabled,
      reminderTime,
    };

    console.log('New habit:', newHabit);

    Alert.alert(
      'Habit ready',
      'Connect handleCreate to your habit store or API to save this habit.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const SectionTitle = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <View className="mb-3">
      <Text
        className="text-sm font-bold"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          className="mt-1 text-xs"
          style={{ color: colors.muted }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );

  return (
    <ScreenContainer
      scroll
      paddingHorizontal={20}
      bottomPadding={32}
      contentContainerStyle={{ paddingTop: 12 }}
    >
      {/* Header */}
      <View className="mb-7 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.surface }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={21}
            color={colors.text}
          />
        </Pressable>

        <Text
          className="text-sm font-bold"
          style={{ color: colors.text }}
        >
          New habit
        </Text>

        <View className="h-10 w-10" />
      </View>

      {/* Intro */}
      <View className="mb-7">
        <Text
          className="text-3xl font-bold tracking-tight"
          style={{ color: colors.text }}
        >
          Build a better you.
        </Text>
        <Text
          className="mt-2 text-sm leading-6"
          style={{ color: colors.muted }}
        >
          Small actions, repeated consistently, create meaningful change.
        </Text>
      </View>

      {/* Habit details */}
      <View className="mb-7">
        <SectionTitle
          title="Habit details"
          subtitle="Give your new habit a clear identity."
        />

        <View
          className="rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            className="mb-2 text-xs font-semibold"
            style={{ color: colors.muted }}
          >
            HABIT NAME
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Read for 20 minutes"
            placeholderTextColor={colors.inactive}
            maxLength={50}
            className="text-base font-semibold"
            style={{ color: colors.text, paddingVertical: 5 }}
          />

          <View
            className="my-3 h-px"
            style={{ backgroundColor: colors.border }}
          />

          <Text
            className="mb-2 text-xs font-semibold"
            style={{ color: colors.muted }}
          >
            DESCRIPTION (OPTIONAL)
          </Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Why is this habit important to you?"
            placeholderTextColor={colors.inactive}
            multiline
            maxLength={120}
            textAlignVertical="top"
            className="text-sm"
            style={{
              color: colors.text,
              minHeight: 55,
              paddingTop: 4,
            }}
          />
        </View>
      </View>

      {/* Icon selection */}
      <View className="mb-7">
        <SectionTitle
          title="Choose an icon"
          subtitle="Pick something that represents your habit."
        />

        <View className="flex-row flex-wrap gap-3">
          {ICONS.map((icon) => {
            const selected = selectedIcon === icon;

            return (
              <Pressable
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: selected
                    ? colors.accentSoft
                    : colors.surface,
                  borderWidth: selected ? 1.5 : 1,
                  borderColor: selected
                    ? ACCENT
                    : colors.border,
                }}
              >
                <MaterialCommunityIcons
                  name={icon}
                  size={22}
                  color={selected ? ACCENT : colors.muted}
                />
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Color selection */}
      <View className="mb-7">
        <SectionTitle
          title="Choose a color"
          subtitle="Give your habit its own visual identity."
        />

        <View className="flex-row flex-wrap items-center gap-3">
          {HABIT_COLORS.map((color) => {
            const selected = selectedColor === color;

            return (
              <Pressable
                key={color}
                onPress={() => setSelectedColor(color)}
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{
                  borderWidth: selected ? 2 : 0,
                  borderColor: color,
                }}
              >
                <View
                  className="h-7 w-7 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {selected && (
                  <View className="absolute">
                    <MaterialCommunityIcons
                      name="check"
                      size={15}
                      color="#FFFFFF"
                    />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Frequency */}
      <View className="mb-7">
        <SectionTitle
          title="Frequency"
          subtitle="Choose the days you want to practice."
        />

        <View
          className="rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Repeat
            </Text>
            <Text
              className="text-xs font-semibold"
              style={{ color: ACCENT }}
            >
              {frequencyLabel}
            </Text>
          </View>

          <View className="flex-row justify-between">
            {DAYS.map((day) => {
              const selected = selectedDays.includes(day.value);

              return (
                <Pressable
                  key={day.value}
                  onPress={() => toggleDay(day.value)}
                  className="h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: selected
                      ? ACCENT
                      : colors.subtle,
                  }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{
                      color: selected ? '#FFFFFF' : colors.muted,
                    }}
                  >
                    {day.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Reminder */}
      <View className="mb-8">
        <SectionTitle
          title="Reminder"
          subtitle="A gentle nudge can help you stay consistent."
        />

        <View
          className="rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: colors.accentSoft }}
              >
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={21}
                  color={ACCENT}
                />
              </View>

              <View className="flex-1">
                <Text
                  className="text-sm font-semibold"
                  style={{ color: colors.text }}
                >
                  Daily reminder
                </Text>
                <Text
                  className="mt-1 text-xs"
                  style={{ color: colors.muted }}
                >
                  Get notified at your chosen time.
                </Text>
              </View>
            </View>

            <Host
              matchContents
              colorScheme={isDark ? 'dark' : 'light'}
              seedColor={ACCENT}
            >
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
              />
            </Host>
          </View>

          {reminderEnabled && (
            <>
              <View
                className="my-4 h-px"
                style={{ backgroundColor: colors.border }}
              />

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={19}
                    color={colors.muted}
                  />
                  <Text
                    className="text-sm font-medium"
                    style={{ color: colors.text }}
                  >
                    Reminder time
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    setReminderTime((current) =>
                      current === '08:00 AM'
                        ? '06:00 PM'
                        : current === '06:00 PM'
                        ? '09:00 PM'
                        : '08:00 AM'
                    )
                  }
                  className="flex-row items-center gap-2 rounded-xl px-3 py-2"
                  style={{ backgroundColor: colors.subtle }}
                >
                  <Text
                    className="text-sm font-bold"
                    style={{ color: colors.text }}
                  >
                    {reminderTime}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={17}
                    color={colors.muted}
                  />
                </Pressable>
              </View>
              <Text
                className="mt-2 text-[10px]"
                style={{ color: colors.muted }}
              >
                Time selection is a demo; connect a native time picker.
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Create button */}
      <Pressable
        onPress={handleCreate}
        disabled={!isValid}
        className="h-14 flex-row items-center justify-center gap-2 rounded-2xl"
        style={{
          backgroundColor: ACCENT,
          opacity: isValid ? 1 : 0.5,
        }}
      >
        <Text className="text-sm font-bold text-white">
          Create habit
        </Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={19}
          color="#FFFFFF"
        />
      </Pressable>

      <Text
        className="mb-4 mt-3 text-center text-[11px]"
        style={{ color: colors.muted }}
      >
        Start small. Stay consistent.
      </Text>
    </ScreenContainer>
  );
}
