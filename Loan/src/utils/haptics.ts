import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const haptics = {
  tap: () => ReactNativeHapticFeedback.trigger('impactLight', options),
  select: () => ReactNativeHapticFeedback.trigger('selection', options),
  success: () => ReactNativeHapticFeedback.trigger('notificationSuccess', options),
  warning: () => ReactNativeHapticFeedback.trigger('notificationWarning', options),
  error: () => ReactNativeHapticFeedback.trigger('notificationError', options),
};