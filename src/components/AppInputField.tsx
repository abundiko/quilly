import { FormMessage } from "@/types/formTypes";

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
  return (
    <>
    {error && <div className="flex justify-end">
      <p className="app-text-error">{error[0]}</p>
    </div>
    }
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      onChange={onChange}
      className={`app-text-field ${error && "bg-[#ee333333]"}`}
      />
      </>
  );
};

export default AppInputField;

export function AppFormMessage({message}:{message:FormMessage}) {
  if(message)
        return message[0] == "success" ? 
        <div className="app-text-field app-bg-success">{message[1]}</div> :
        <div className="app-text-field app-bg-error">{message[1]}</div> 
}