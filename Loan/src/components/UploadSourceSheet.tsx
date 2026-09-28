import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, radius, typography } from '../theme/theme';
import type { PickSource } from '../utils/pickFile';

interface Props {
  visible: boolean;
  title: string;
  allowFile?: boolean;
  onSelect: (source: PickSource) => void;
  onClose: () => void;
}

const UploadSourceSheet = ({
  visible,
  title,
  allowFile = true,
  onSelect,
  onClose,
}: Props) => {
  const options: { source: PickSource; icon: string; label: string }[] = [
    { source: 'camera', icon: 'photo-camera', label: 'Take a photo' },
    { source: 'gallery', icon: 'photo-library', label: 'Choose from gallery' },
    ...(allowFile
      ? [
          {
            source: 'file' as PickSource,
            icon: 'attach-file',
            label: 'Choose PDF / file',
          },
        ]
      : []),
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>{title}</Text>
        {options.map(o => (
          <TouchableOpacity
            key={o.source}
            style={styles.option}
            onPress={() => onSelect(o.source)}
          >
            <View style={styles.optionIcon}>
              <Icon name={o.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.optionLabel}>{o.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancel} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  title: { ...typography.h3, marginBottom: spacing.sm },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  optionLabel: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  cancel: { alignItems: 'center', paddingVertical: 14, marginTop: spacing.xs },
  cancelText: { color: colors.textSecondary, fontWeight: '600' },
});

export default UploadSourceSheet;
