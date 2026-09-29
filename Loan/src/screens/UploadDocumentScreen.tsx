import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';
import UploadSourceSheet from '../components/UploadSourceSheet';
import {
  pickFile,
  MAX_FILE_SIZE,
  PickedFile,
  PickSource,
} from '../utils/pickFile';

type Props = NativeStackScreenProps<RootStackParamList, 'UploadDocuments'>;

interface DocItem {
  key: string;
  title: string;
  subtitle: string;
  allowFile: boolean;
}

const DOCUMENTS: DocItem[] = [
  {
    key: 'aadhaar',
    title: 'Aadhaar Card',
    subtitle: 'Upload front side',
    allowFile: true,
  },
  {
    key: 'pan',
    title: 'PAN Card',
    subtitle: 'Upload PAN card',
    allowFile: true,
  },
  {
    key: 'income',
    title: 'Income Proof',
    subtitle: 'Salary slip / Bank statement',
    allowFile: true,
  },
  {
    key: 'address',
    title: 'Address Proof',
    subtitle: 'Utility bill / Rent agreement',
    allowFile: true,
  },
  {
    key: 'photo',
    title: 'Photo',
    subtitle: 'Upload recent photo',
    allowFile: false,
  },
];

const UploadDocumentsScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;
  const [files, setFiles] = useState<Record<string, PickedFile>>({});
  const [activeDoc, setActiveDoc] = useState<DocItem | null>(null);

  const allUploaded = DOCUMENTS.every(d => files[d.key]);

  const handleSelectSource = async (source: PickSource) => {
    const doc = activeDoc;
    setActiveDoc(null);
    if (!doc) return;

    // Let the sheet finish closing first. iOS can't present a picker over a dismissing Modal.
    await new Promise<void>(r => setTimeout(() => r(), 350));

    try {
      const file = await pickFile(source);
      if (!file) return; // cancelled
      if (file.size && file.size > MAX_FILE_SIZE) {
        Alert.alert('File too large', 'Please choose a file under 5 MB.');
        return;
      }
      setFiles(prev => ({ ...prev, [doc.key]: file }));
    } catch {
      Alert.alert(
        'Something went wrong',
        'Could not open the picker. Check app permissions and try again.',
      );
    }
  };

  const removeFile = (key: string) =>
    setFiles(prev => {
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });

  const handleContinue = () => navigation.navigate('BankDetails', { flowType });

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        {DOCUMENTS.map(doc => {
          const file = files[doc.key];
          const isImage = file?.type?.startsWith('image/');
          return (
            <View key={doc.key} style={[styles.docCard, shadow.card]}>
              {file && isImage && (
                <Image source={{ uri: file.uri }} style={styles.thumb} />
              )}
              {file && !isImage && (
                <View style={[styles.thumb, styles.thumbFile]}>
                  <Icon
                    name="picture-as-pdf"
                    size={20}
                    color={colors.primary}
                  />
                </View>
              )}

              <View style={styles.docText}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                <Text style={styles.docSubtitle} numberOfLines={1}>
                  {file ? file.name : doc.subtitle}
                </Text>
              </View>

              {file ? (
                <TouchableOpacity
                  onPress={() => removeFile(doc.key)}
                  hitSlop={10}
                >
                  <Icon name="close" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => setActiveDoc(doc)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <AnimatedButton
          title="Continue"
          disabled={!allUploaded}
          onPress={handleContinue}
        />
      </View>
      <UploadSourceSheet
        visible={!!activeDoc}
        title={activeDoc ? `Upload ${activeDoc.title}` : ''}
        allowFile={activeDoc?.allowFile}
        onSelect={handleSelectSource}
        onClose={() => setActiveDoc(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.lg },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    marginRight: spacing.sm,
  },
  thumbFile: {
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docText: { flex: 1, marginRight: spacing.sm },
  docTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  docSubtitle: { ...typography.caption, marginTop: 2 },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySurface,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  uploadButtonText: { color: colors.primary, fontWeight: '700', fontSize: 12 },
  footer: { padding: spacing.md, paddingBottom: spacing.lg },
});

export default UploadDocumentsScreen;
