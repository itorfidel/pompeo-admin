export function triggerError(
  isError: T,
  value: boolean,
  setIsError: React.Dispatch<React.SetStateAction<T>>,
  options?: object
) {
  const newIsError = { ...isError };
  Object.keys(isError).map((key) => (newIsError[key] = value));
  setIsError(newIsError);

  if (options) {
    setIsError({ ...newIsError, ...options });
  }
}

export function triggerErrorMessage(
  initialMessage: T,
  currentMessage: string,
  setCurrentMessage: React.Dispatch<React.SetStateAction<T>>,
  options?: object
) {
  const newMessage = { ...initialMessage };
  Object.keys(initialMessage).map((key) => (newMessage[key] = currentMessage));
  setCurrentMessage(newMessage);

  if (options) {
    setCurrentMessage({ ...newMessage, ...options });
  }
}
