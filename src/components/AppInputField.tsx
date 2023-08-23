import { FormMessage } from "@/types/formTypes";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type AppInputFieldProps = {
  type: string;
  placeholder: string;
  error?: string[];
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AppInputField = ({
  type = "text",
  placeholder,
  error,
  name,
  onChange
}: AppInputFieldProps) => {
  const [isHidden, setHidden] = useState(true);
  const isPassword = type === "password";
  return (
    <div className="relative">
      {error &&
        <div className="flex justify-end">
          <p className="app-text-error">
            {error[0]}
          </p>
        </div>}
      <input
        type={isPassword ? (isHidden ? type : "text") : type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        className={`app-text-field ${error && "bg-[#ee333333]"}`}
      />
      {isPassword &&
        <i className="absolute bottom-8 right-3">
          {!isHidden
            ? <FaEye onClick={() => setHidden(!isHidden)} />
            : <FaEyeSlash onClick={() => setHidden(!isHidden)} />}
        </i>}
    </div>
  );
};

export default AppInputField;

export function AppFormMessage({ message }: { message: FormMessage }) {
  if (message)
    return message[0] == "success"
      ? <div className="app-text-field app-bg-success">
          {message[1]}
        </div>
      : <div className="app-text-field app-bg-error">
          {message[1]}
        </div>;
}
