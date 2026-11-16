
import {
    View,
    ScrollView,
    StyleSheet,
    useColorScheme,
    type ViewStyle,
    type StyleProp,
    type ScrollViewProps,
} from 'react-native';

import {
    SafeAreaView,
    type Edge,
} from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';


type ScreenContainerProps = {
    children: ReactNode;
    scroll?: boolean;
    centered?: boolean;
    paddingHorizontal?: number;
    bottomPadding?: number;
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    edges?: Edge[];
    showsVerticalScrollIndicator?: boolean;
    keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
};

export const useAppTheme = () => {
  const isDark = useColorScheme() === 'dark';

  return {
    isDark,
    colors: isDark ? COLORS.dark : COLORS.light,
  };
};


const ScreenContainer = ({
    children,
    scroll = true,
    centered = false,
    paddingHorizontal = 20,
    bottomPadding = 24,
    backgroundColor,
    style,
    contentContainerStyle,
    edges = ['top', 'left', 'right'],
    showsVerticalScrollIndicator = false,
    keyboardShouldPersistTaps = 'handled',
}: ScreenContainerProps) => {
    const { colors } = useAppTheme();

    const background = backgroundColor ?? colors.background;

    return (
        <SafeAreaView
            edges={edges}
            style={[
                styles.container,
                { backgroundColor: background },
                style,
            ]}
        >
            <StatusBar style="auto" />
            {scroll ? (
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={[
                        styles.content,
                        {
                            paddingHorizontal,
                            paddingBottom: bottomPadding,
                            flexGrow: 1,
                        },
                        centered && styles.centered,
                        contentContainerStyle,
                    ]}
                    showsVerticalScrollIndicator={
                        showsVerticalScrollIndicator
                    }
                    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                >
                    {children}
                </ScrollView>
            ) : (
                <View
                    style={[
                        styles.content,
                        {
                            flex: 1,
                            paddingHorizontal,
                            paddingBottom: bottomPadding,
                        },
                        centered && styles.centered,
                        contentContainerStyle,
                    ]}
                >
                    {children}
                </View>
            )}
        </SafeAreaView>
    );
};

export default ScreenContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingTop: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
