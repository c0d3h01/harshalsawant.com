import ImagePreview from "@/components/ImagePreview";
import SocialLinks from "@/components/SocialLinks";

interface ProfileHeaderProps {
	userName: string;
	userBio: string;
	userImage: string;
}

const ProfileHeader = ({
	userName,
	userBio,
	userImage,
}: ProfileHeaderProps) => {
	const alt = `${userName} — Software Engineer`;

	return (
		<section className="flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
			<div className="shrink-0">
				<ImagePreview
					src={userImage}
					alt={alt}
					previewAlt={`${alt} Preview`}
					dialogLabel="Profile picture preview"
					triggerAriaLabel="Open avatar preview"
					trigger={
						<span className="pro-pic-shell relative block size-24 sm:size-28 md:size-32">
							<img
								src={userImage}
								alt={alt}
								width={128}
								height={128}
								fetchPriority="high"
								className="pro-pic object-cover"
							/>
						</span>
					}
				/>
			</div>

			<div className="flex min-w-0 flex-col items-center gap-2 sm:items-start">
				<div className="flex flex-col gap-1">
					<h1 className="text-lg font-bold sm:text-xl md:text-2xl">
						{userName}
					</h1>
					<p>{userBio}</p>
				</div>
				<SocialLinks />
			</div>
		</section>
	);
};

export default ProfileHeader;
