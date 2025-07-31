import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
  StorageError,
} from "firebase/storage";

const uploadProgress = (
  snapshot: UploadTaskSnapshot,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const progress = Math.floor(
    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  );
  setProgress(progress);
  console.log(`Upload is ${progress}% done`);
  switch (snapshot.state) {
    case "paused":
      console.log("Upload is paused");
      break;
    case "running":
      console.log("Upload is running");
      break;
    default:
      console.log("Uploading...\n", `snapshot: ${snapshot}`);
  }
};

const uploadError = (error: StorageError) => {
  switch (error.code) {
    case "storage/unauthorized":
      console.log("You are not authorized.");
      break;
    case "storage/cancelled":
      console.log("Upload has been cancelled.");
      break;
    case "storage/unknown":
      console.log("Unknown error occurred, inspect error.serverResponse.");
      break;
    default:
      console.log("An error occured.\n", error);
  }
};

export const upload = (
  file: File,
  setUrl: React.Dispatch<React.SetStateAction<string>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage();
  const storageRef = ref(storage, `/users/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      uploadProgress(snapshot, setProgress);
    },
    uploadError,
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setUrl(url);
      });
    }
  );
};
