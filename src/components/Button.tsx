import type { ComponentProps } from "react";

type ButtonVariant = "default" | "unstyled";

interface ButtonProps extends ComponentProps<"button"> {
	variant?: ButtonVariant;
}

const variantClassName: Record<ButtonVariant, string> = {
	default:
		"btn cursor-pointer w-fit select-none flex flex-row gap-1.5 items-center px-2 py-1 rounded-md transition-transform duration-100 active:scale-[0.97]",
	unstyled: "",
};

const Button = ({
	type = "button",
	variant = "default",
	className,
	...props
}: ButtonProps) => {
	const resolvedClassName = [variantClassName[variant], className]
		.filter(Boolean)
		.join(" ");

	return <button type={type} className={resolvedClassName} {...props} />;
};

export default Button;
