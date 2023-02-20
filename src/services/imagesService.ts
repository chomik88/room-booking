import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export async function uploadImagesService(
  files: File[] | null,
  hotelId: string
) {
  if (!files) return;
  const storage = getStorage();
  const paths: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      const storageRef = ref(storage, `images/${hotelId}/${file.name}`);
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
      const imageUrl = await getDownloadURL(pathRef);
      return imageUrl;
    })
  );
  return imageUrls;
}

export async function removeImages(images: string[]) {
  const storage = getStorage();
  await Promise.all(
    images.map(async (img) => {
      const imgRef = ref(storage, img);
      await deleteObject(imgRef);
    })
  );
  return images;
}
