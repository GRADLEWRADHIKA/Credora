import React, { useRef } from 'react';
import {
  Animated,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, radius, shadow } from '../theme/theme';
import { haptics } from '../utils/haptics';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: string;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedButton = ({
  title,
  onPress,
  variant = 'primary',
  icon = 'arrow-forward',
  loading = false,
  style,
  textStyle,
}: Props) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const isPrimary = variant === 'primary';

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={() => animateTo(0.96)}
        onPressOut={() => animateTo(1)}
        onPress={() => {
          haptics.tap();
          onPress();
        }}
        disabled={loading}
        style={[
          styles.base,
          isPrimary ? styles.primary : styles.secondary,
          isPrimary && shadow.button,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={isPrimary ? colors.white : colors.primary}
          />
        ) : (
          <>
            <Text
              style={[
                styles.text,
                { color: isPrimary ? colors.white : colors.primary },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {icon ? (
              <Icon
                name={icon}
                size={20}
                color={isPrimary ? colors.white : colors.primary}
                style={{ marginLeft: 8 }}
              />
            ) : null}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  text: { fontWeight: '700', fontSize: 16 },
});

export default AnimatedButton;
