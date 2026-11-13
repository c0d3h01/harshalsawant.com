import { Link } from "react-router";

interface BrandMarkProps {
	showRole?: boolean;
}

const BrandMark = ({ showRole = true }: BrandMarkProps) => (
	<Link to="/" className="brand" aria-label="Harshal Sawant — home">
		<span aria-hidden="true" className="brand-mark">
			HS
		</span>
		<span className="brand-name">Harshal Sawant</span>
		{showRole && (
			<span className="brand-role mono-label hidden lg:inline">
				Backend engineer
			</span>
		)}
	</Link>
);

export default BrandMark;
