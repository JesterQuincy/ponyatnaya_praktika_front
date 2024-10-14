import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    iconSrc?: string; // Пропс для пути к SVG-иконке
    iconAlt?: string; // Пропс для описания иконки
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", iconSrc, iconAlt, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm pr-10 ring-offset-background placeholder:placeholderText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        iconSrc ? "pr-10" : "", // Отступ для иконки
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {iconSrc && (
                    <Image
                        src={iconSrc}
                        alt={iconAlt || "Icon"}
                        width={12}
                        height={12}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
