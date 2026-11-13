import { Outlet } from "react-router";
import MobileDock from "@/components/MobileDock";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const SiteLayout = () => (
	<>
		<a href="#main" className="skip-link">
			Skip to content
		</a>
		<SiteHeader />
		<main id="main" tabIndex={-1}>
			<Outlet />
		</main>
		<SiteFooter />
		<MobileDock />
	</>
);

export default SiteLayout;
