import { lazy, type ReactNode, Suspense, useState } from "react";
import Button from "@/components/Button";

const ImagePreviewDialog = lazy(
	() => import("@/components/ImagePreviewDialog"),
);

interface ImagePreviewProps {
	src: string;
	alt: string;
	trigger: ReactNode;
	previewAlt?: string;
	dialogLabel?: string;
	triggerAriaLabel?: string;
}

const ImagePreview = ({
	src,
	alt,
	trigger,
	previewAlt,
	dialogLabel,
	triggerAriaLabel = "Open image preview",
}: ImagePreviewProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				variant="unstyled"
				aria-label={triggerAriaLabel}
				onClick={() => setIsOpen(true)}
				className="cursor-pointer select-none"
			>
				{trigger}
			</Button>

			{isOpen && (
				<Suspense fallback={null}>
					<ImagePreviewDialog
						onClose={() => setIsOpen(false)}
						src={src}
						alt={previewAlt ?? alt}
						dialogLabel={dialogLabel}
					/>
				</Suspense>
			)}
		</>
	);
};

export default ImagePreview;
