export function handleEventChange<T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value } = e.target;
  setState((state) => ({ ...state, [name]: value }));
}

export function handleEventBlurCapture<T>(
  e: React.FocusEvent<HTMLInputElement, Element>,
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value } = e.target;
  setState((state) => ({ ...state, [name]: !value ? true : false }));
}

export const handleInputFile = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  setImageFileUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.target.files) {
    const image = e.target.files[0];

    if (image) {
      setImageFile(image);
      setImageFileUrl(URL.createObjectURL(image));
    }
  }
};
