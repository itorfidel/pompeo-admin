import Flex from "./styled/Flex";
import StyledInput from "./styled/Input";

interface Props {
  type: string;
  placeholder?: string;
  defaultValue?: string;
  svg: React.ReactElement;
  id?: string;
  label?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  isClientError?: boolean;
  clientErrorMessage?: string;
  isServerError?: boolean;
  serverErrorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurCapture?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const Input = ({
  type,
  placeholder,
  defaultValue,
  svg,
  id,
  label,
  style,
  disabled,
  isClientError,
  clientErrorMessage,
  isServerError,
  serverErrorMessage,
  onChange,
  onBlurCapture,
}: Props) => {
  return (
    <StyledInput style={{ ...style }}>
      <Flex $justify="space-between">
        {label && <label htmlFor={id}>{label}</label>}
        {
          <span className="error">
            {isClientError
              ? clientErrorMessage
              : isServerError
              ? serverErrorMessage
              : ""}
          </span>
        }
      </Flex>
      <div className="inputContainer">
        {svg}
        <input
          type={type}
          name={id}
          placeholder={placeholder}
          defaultValue={defaultValue ? defaultValue : ""}
          disabled={disabled ? true : false}
          autoComplete="off"
          id={id}
          className={isClientError || isServerError ? "inputError" : ""}
          onChange={onChange}
          onBlurCapture={onBlurCapture}
        />
      </div>
    </StyledInput>
  );
};

export default Input;
