import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';

export interface PickedFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

export type PickSource = 'camera' | 'gallery' | 'file';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const imageOptions = {
  mediaType: 'photo' as const,
  quality: 0.8 as const,
  maxWidth: 1600,
  maxHeight: 1600,
};

export async function pickFile(source: PickSource): Promise<PickedFile | null> {
  if (source === 'file') {
    try {
      const [res] = await pick({ type: [types.pdf, types.images] });
      return {
        uri: res.uri,
        name: res.name ?? 'document',
        type: res.type ?? 'application/octet-stream',
        size: res.size ?? undefined,
      };
    } catch (e) {
      if (isErrorWithCode(e) && e.code === errorCodes.OPERATION_CANCELED) return null;
      throw e;
    }
  }

  const res =
    source === 'camera'
      ? await launchCamera(imageOptions)
      : await launchImageLibrary(imageOptions);

  if (res.didCancel) return null;
  if (res.errorCode) throw new Error(res.errorMessage ?? res.errorCode);

  const asset = res.assets?.[0];
  if (!asset?.uri) return null;

  return {
    uri: asset.uri,
    name: asset.fileName ?? 'photo.jpg',
    type: asset.type ?? 'image/jpeg',
    size: asset.fileSize,
  };
}