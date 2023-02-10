import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export async function uploadImagesService(files: File[] | null) {
  if (!files) return;
  const storage = getStorage();
  const paths: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        paths.push(snapshot.metadata.fullPath);
      });
    })
  );
  return paths;
}

export async function getHotelImages(images: string[] | null) {
  if (!images) return;
  const storage = getStorage();
  const imageUrls = Promise.all(
    images.map(async (img) => {
      const pathRef = ref(storage, img);
      return await getDownloadURL(pathRef);
    })
  );
  return imageUrls;
}
