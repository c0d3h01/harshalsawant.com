import { type KeyboardEvent, type MouseEvent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ImagePreviewDialogProps {
	onClose: () => void;
	src: string;
	alt: string;
	dialogLabel?: string;
	width?: number;
	height?: number;
	dialogWidthClassName?: string;
	imageClassName?: string;
}

const ImagePreviewDialog = ({
	onClose,
	src,
	alt,
	dialogLabel = "Image preview",
	width = 600,
	height = 600,
	dialogWidthClassName = "w-[min(90vw,24rem)]",
	imageClassName = "h-full w-full rounded-lg object-contain",
}: ImagePreviewDialogProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		const previousFocus =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		return () => {
			document.body.style.overflow = previousOverflow;
			previousFocus?.focus();
		};
	}, []);

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			onClose();
			return;
		}

		if (event.key !== "Tab") {
			return;
		}

		event.preventDefault();
		closeButtonRef.current?.focus();
	};

	const closeOnBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<div
			role="dialog"
			aria-modal="true"
			aria-label={dialogLabel}
			tabIndex={-1}
			onClick={closeOnBackdropClick}
			onKeyDown={handleKeyDown}
			className="image-preview-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
		>
			<div
				className={`image-preview-content ${dialogWidthClassName} relative overflow-hidden rounded-lg`}
			>
				<button
					ref={closeButtonRef}
					type="button"
					aria-label="Close image preview"
					onClick={onClose}
					className="absolute top-3 right-3 z-20 rounded-full bg-black/70 p-2.5 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<svg
						aria-hidden="true"
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<img
					src={src}
					alt={alt}
					width={width}
					height={height}
					className={imageClassName}
				/>
			</div>
		</div>,
		document.body,
	);
};

export default ImagePreviewDialog;
