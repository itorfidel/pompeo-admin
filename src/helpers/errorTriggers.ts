export function triggerError<T>(
  isError: T,
  value: boolean,
  setIsError: React.Dispatch<React.SetStateAction<T>>,
  options?: object
) {
  const newIsError = { ...isError };
  Object.keys(isError as object).map(
    (key) => ((newIsError as Record<string, unknown>)[key] = value)
  );
  setIsError(newIsError);

  if (options) {
    setIsError({ ...newIsError, ...options });
  }
}

export function triggerErrorMessage<T>(
  initialMessage: T,
  currentMessage: string,
  setCurrentMessage: React.Dispatch<React.SetStateAction<T>>,
  options?: object
) {
  const newMessage = { ...initialMessage };
  Object.keys(initialMessage as object).map(
    (key) => ((newMessage as Record<string, unknown>)[key] = currentMessage)
  );
  setCurrentMessage(newMessage);

  if (options) {
    setCurrentMessage({ ...newMessage, ...options });
  }
}
