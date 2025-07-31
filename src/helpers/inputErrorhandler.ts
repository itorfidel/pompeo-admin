function inputErrorhandler<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  inputErrName: string,
  inputErrState: string | number | boolean | undefined
) {
  setState((state) => ({
    ...state,
    [inputErrName]: !inputErrState ? true : false,
  }));
}

export default inputErrorhandler;
