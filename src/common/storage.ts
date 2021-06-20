import { firebaseStorage } from './firebase';

export const uploadFileToStorage = async (
  uid: string,
  file?: File,
): Promise<string | undefined> => {
  if (!file) {
    return;
  }
  console.log(file);

  const fileName = `${Date.now()}_${file.name}`;

  const filePath = `${uid}/${fileName}`;
  const metadata = { contentType: file.type };

  const uploadedResult = await firebaseStorage
    .ref()
    .child(filePath)
    .put(file, metadata);

  return String(await uploadedResult.ref.getDownloadURL());
};
