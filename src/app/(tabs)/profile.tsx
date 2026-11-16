
import { useState } from 'react';
import {
  Alert,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BottomSheet, Host } from '@expo/ui';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ScreenContainer, {
  useAppTheme,
} from '@/components/ui/ScreenContainer';
import { COLORS } from '@/constants/colors';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

type SettingRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  showChevron?: boolean;
};

function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onPress,
  danger = false,
  showChevron = true,
}: SettingRowProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center py-3.5"
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: danger
            ? 'rgba(214,107,112,0.10)'
            : colors.subtle,
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={19}
          color={danger ? colors.danger : colors.muted}
        />
      </View>

      <View className="ml-3 flex-1">
        <Text
          className="text-sm font-semibold"
          style={{ color: danger ? colors.danger : colors.text }}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            className="mt-0.5 text-xs"
            style={{ color: colors.muted }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {value ? (
        <Text
          className="mr-2 text-xs font-medium"
          style={{ color: colors.muted }}
        >
          {value}
        </Text>
      ) : null}

      {showChevron && onPress ? (
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.inactive}
        />
      ) : null}
    </Pressable>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { colors } = useAppTheme();

  return (
    <View className="mt-6">
      <Text
        className="mb-3 text-sm font-semibold"
        style={{ color: colors.text }}
      >
        {title}
      </Text>

      <View
        className="rounded-3xl px-4"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@example.com');

  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);

  const openEditSheet = () => {
    setEditedName(name);
    setEditedEmail(email);
    setIsEditSheetOpen(true);
  };

  const handleSaveProfile = () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    setName(editedName.trim());
    setEmail(editedEmail.trim());
    setIsEditSheetOpen(false);
  };
  const { colors, isDark } = useAppTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleEditProfile = () => {
    Alert.alert('Edit profile', 'Connect this action to your profile editing screen.');
  };

  const handleAppearance = () => {
    Alert.alert(
      'Appearance',
      'Connect this action to your app theme settings.',
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => {
            // Connect your authentication sign-out logic here.
          },
        },
      ],
    );
  };

  return (
    <>
      <ScreenContainer
        scroll
        paddingHorizontal={20}
        bottomPadding={125}
        contentContainerStyle={{ paddingTop: 12 }}
      >
        {/* Header */}
        <View className="mb-7 flex-row items-center justify-between">
          <View>
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Profile
            </Text>
            <Text
              className="mt-1 text-sm"
              style={{ color: colors.muted }}
            >
              Manage your account and preferences
            </Text>
          </View>

          <Pressable
            onPress={openEditSheet}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.surface }}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={19}
              color={colors.text}
            />
          </Pressable>
        </View>

        {/* Profile card */}
        <View
          className="rounded-3xl p-5"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center">
            <View className="relative">
              <View
                className="h-[68px] w-[68px] items-center justify-center rounded-full"
                style={{ backgroundColor: colors.accentSoft }}
              >
                <Text
                  className="text-2xl font-bold"
                  style={{ color: COLORS.primary }}
                >
                  A
                </Text>
              </View>

              <View
                className="absolute bottom-0 right-0 h-5 w-5 items-center justify-center rounded-full"
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 2,
                  borderColor: colors.surface,
                }}
              >
                <MaterialCommunityIcons
                  name="check-circle"
                  size={15}
                  color={colors.success}
                />
              </View>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold" style={{ color: colors.text }}>
                {name}
              </Text>

              <Text className="mt-1 text-xs" style={{ color: colors.muted }}>
                {email}
              </Text>

              <View
                className="mt-2 self-start rounded-full px-2.5 py-1"
                style={{ backgroundColor: colors.accentSoft }}
              >
                <Text
                  className="text-[10px] font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  FREE MEMBER
                </Text>
              </View>
            </View>
          </View>

          <View
            className="my-5"
            style={{ height: 1, backgroundColor: colors.border }}
          />

          <Pressable
            onPress={openEditSheet}
            className="flex-row items-center justify-center"
          >
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={17}
              color={COLORS.primary}
            />
            <Text
              className="ml-2 text-sm font-semibold"
              style={{ color: COLORS.primary }}
            >
              Edit profile
            </Text>
          </Pressable>
        </View>

        {/* Statistics */}
        <View className="mt-7">
          <Text
            className="mb-3 text-sm font-semibold"
            style={{ color: colors.text }}
          >
            Your journey
          </Text>

          <View className="flex-row gap-3">
            <View
              className="flex-1 rounded-3xl p-4"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: colors.accentSoft }}
              >
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={19}
                  color={COLORS.primary}
                />
              </View>

              <Text
                className="mt-4 text-2xl font-bold"
                style={{ color: colors.text }}
              >
                186
              </Text>

              <Text
                className="mt-1 text-xs"
                style={{ color: colors.muted }}
              >
                Completions
              </Text>
            </View>

            <View
              className="flex-1 rounded-3xl p-4"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(214,154,69,0.13)' }}
              >
                <MaterialCommunityIcons
                  name="fire"
                  size={19}
                  color={colors.warning}
                />
              </View>

              <Text
                className="mt-4 text-2xl font-bold"
                style={{ color: colors.text }}
              >
                12
              </Text>

              <Text
                className="mt-1 text-xs"
                style={{ color: colors.muted }}
              >
                Best streak
              </Text>
            </View>

            <View
              className="flex-1 rounded-3xl p-4"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(79,150,117,0.13)' }}
              >
                <MaterialCommunityIcons
                  name="chart-line"
                  size={19}
                  color={colors.success}
                />
              </View>

              <Text
                className="mt-4 text-2xl font-bold"
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
        </View>

        {/* Account */}
        <SectionCard title="Account">
          <SettingRow
            icon="account-outline"
            title="Personal information"
            subtitle="Your name and email address"
            onPress={handleEditProfile}
          />

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <SettingRow
            icon="shield-lock-outline"
            title="Security"
            subtitle="Password and account security"
            onPress={() =>
              Alert.alert('Security', 'Connect your security settings screen.')
            }
          />

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <SettingRow
            icon="cloud-sync-outline"
            title="Data and backup"
            subtitle="Manage your habit data"
            onPress={() =>
              Alert.alert('Data and backup', 'Connect your backup settings.')
            }
          />
        </SectionCard>

        {/* Preferences */}
        <SectionCard title="Preferences">
          <View className="flex-row items-center py-3.5">
            <View
              className="h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.subtle }}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={19}
                color={colors.muted}
              />
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.text }}
              >
                Notifications
              </Text>
              <Text
                className="mt-0.5 text-xs"
                style={{ color: colors.muted }}
              >
                Habit reminders and updates
              </Text>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: colors.border,
                true: COLORS.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <SettingRow
            icon={isDark ? 'moon-waning-crescent' : 'white-balance-sunny'}
            title="Appearance"
            subtitle="Customize your app theme"
            value={isDark ? 'Dark' : 'Light'}
            onPress={handleAppearance}
          />

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <SettingRow
            icon="calendar-week-outline"
            title="Week starts on"
            subtitle="Choose your calendar layout"
            value="Monday"
            onPress={() =>
              Alert.alert('Week starts on', 'Connect your calendar preferences.')
            }
          />
        </SectionCard>

        {/* Support */}
        <SectionCard title="Support">
          <SettingRow
            icon="help-circle-outline"
            title="Help center"
            onPress={() =>
              Alert.alert('Help center', 'Connect your help center page.')
            }
          />

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <SettingRow
            icon="message-text-outline"
            title="Send feedback"
            onPress={() =>
              Alert.alert('Feedback', 'Connect your feedback form.')
            }
          />

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <SettingRow
            icon="file-document-outline"
            title="Privacy policy"
            onPress={() =>
              Alert.alert('Privacy policy', 'Add your privacy policy URL.')
            }
          />
        </SectionCard>

        {/* Logout */}
        <View
          className="mt-6 rounded-3xl px-4"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <SettingRow
            icon="logout"
            title="Log out"
            danger
            showChevron={false}
            onPress={handleLogout}
          />
        </View>

        {/* Footer */}
        <View className="items-center pb-5 pt-8">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="sprout"
              size={17}
              color={COLORS.primary}
            />
            <Text
              className="ml-1.5 text-sm font-bold"
              style={{ color: colors.text }}
            >
              HabitFlow
            </Text>
          </View>

          <Text
            className="mt-2 text-[11px]"
            style={{ color: colors.muted }}
          >
            Small steps. Meaningful progress.
          </Text>

          <Text
            className="mt-1 text-[10px]"
            style={{ color: colors.inactive }}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScreenContainer>

      <Host
        matchContents
        colorScheme={isDark ? 'dark' : 'light'}
        seedColor={COLORS.primary}
      >
        <BottomSheet
          isPresented={isEditSheetOpen}
          onDismiss={() => setIsEditSheetOpen(false)}
          snapPoints={['half', 'full']}
          containerColor={colors.surface}
          showDragIndicator
        >
          <View className="px-5 pb-8 pt-3">
            {/* Sheet header */}
            <View className="mb-6 flex-row items-center justify-between">
              <View>
                <Text
                  className="text-xl font-bold"
                  style={{ color: colors.text }}
                >
                  Edit profile
                </Text>
                <Text
                  className="mt-1 text-sm"
                  style={{ color: colors.muted }}
                >
                  Update your personal information
                </Text>
              </View>

              <Pressable
                onPress={() => setIsEditSheetOpen(false)}
                className="h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.subtle }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={19}
                  color={colors.muted}
                />
              </Pressable>
            </View>

            {/* Avatar */}
            <View className="mb-6 items-center">
              <View className="relative">
                <View
                  className="h-20 w-20 items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.accentSoft }}
                >
                  <Text
                    className="text-3xl font-bold"
                    style={{ color: COLORS.primary }}
                  >
                    {editedName.trim().charAt(0).toUpperCase() || '?'}
                  </Text>
                </View>

                <View
                  className="absolute bottom-0 right-0 h-7 w-7 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: COLORS.primary,
                    borderWidth: 2,
                    borderColor: colors.surface,
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={14}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <Text
                className="mt-2 text-xs"
                style={{ color: colors.muted }}
              >
                Profile photo editing coming soon
              </Text>
            </View>

            {/* Name */}
            <Text
              className="mb-2 text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Full name
            </Text>

            <View
              className="mb-5 flex-row items-center rounded-2xl px-4"
              style={{
                backgroundColor: colors.subtle,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={19}
                color={colors.muted}
              />

              <TextInput
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Your name"
                placeholderTextColor={colors.inactive}
                autoCapitalize="words"
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 12,
                  color: colors.text,
                  fontSize: 14,
                }}
              />
            </View>

            {/* Email */}
            <Text
              className="mb-2 text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Email address
            </Text>

            <View
              className="mb-7 flex-row items-center rounded-2xl px-4"
              style={{
                backgroundColor: colors.subtle,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={19}
                color={colors.muted}
              />

              <TextInput
                value={editedEmail}
                onChangeText={setEditedEmail}
                placeholder="Your email"
                placeholderTextColor={colors.inactive}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 12,
                  color: colors.text,
                  fontSize: 14,
                }}
              />
            </View>

            {/* Actions */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setIsEditSheetOpen(false)}
                className="h-13 flex-1 items-center justify-center rounded-2xl"
                style={{ backgroundColor: colors.subtle }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: colors.text }}
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSaveProfile}
                className="h-13 flex-[1.5] flex-row items-center justify-center rounded-2xl"
                style={{ backgroundColor: COLORS.primary }}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={18}
                  color="#FFFFFF"
                />
                <Text className="ml-2 text-sm font-semibold text-white">
                  Save changes
                </Text>
              </Pressable>
            </View>
          </View>
        </BottomSheet>
      </Host>

    </>
  );
}
