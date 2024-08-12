import { Footer } from "@/components/Footer/Footer";
import { EmailSection } from "@/components/Landing/EmailSection";
import { FeaturesSection } from "@/components/Landing/FeaturesSection";
import { Header } from "@/components/Landing/Header";
import { HeroSection } from "@/components/Landing/HeroSection";
import HireOrGetHireSection from "@/components/Landing/HireOrGetHireSection";
import { LandingContainer } from "@/components/Landing/LandingContainer";

export default function Page() {
	return (
		<LandingContainer>
			<Header
				links={[
					{
						link: "/learn",
						label: "Solutions",
					},
					{
						link: "/about",
						label: "About Us",
					},
					{
						link: "/pricing",
						label: "Contact Us",
					},
				]}
			/>
			<HeroSection />

			<FeaturesSection title="Features" description="Description to think" />
			<HireOrGetHireSection />
			<EmailSection />
			<Footer />
		</LandingContainer>
	);
}
