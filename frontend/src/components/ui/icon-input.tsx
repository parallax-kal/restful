import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;
    return (
      <div
        className={cn(
          "flex items-center gap-1 group rounded-[10px] border border-input bg-[#F5F5F7] pl-4 text-sm py-2.5 relative",
          className
        )}
      >
        <Icon
          size={18}
          className=" group-focus-within:text-black text-[#868AA5]"
        />
        <input
          ref={ref}
          type={
            type === "password" && showPassword ? "text" : type ? type : "text"
          }
          className="w-full p-2 placeholder:text-[#8B8FA8] placeholder:font-medium placeholder:text-[16px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-[#3C4071] text-[18px] font-medium bg-transparent"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {type !== "password" ? undefined : showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);

IconInput.displayName = "AuthInput";

export default IconInput;
