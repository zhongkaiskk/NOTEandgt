interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  required?: boolean;
}

export function InputField({ id, name, type, label, icon, required }: InputFieldProps) {
  return (
    <div>
      <label 
        className="block text-sm font-medium text-gray-300 mb-2" 
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          {icon}
        </div>
        <input
          id={id}
          name={name}
          type={type}
          className="input pl-10 w-full bg-gray-900 border-gray-700 focus:border-primary"
          placeholder={`Enter your ${label.toLowerCase()}`}
          required={required}
        />
      </div>
    </div>
  );
}