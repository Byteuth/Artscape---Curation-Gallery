import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
	return (
		<footer className="max-w-4xl mx-auto ">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-44 gap-16">
					{/* Left side */}
					<div className="space-y-4">
						<h2 className="text-xl font-bold">Exhibition Information</h2>
						<div className="flex space-x-2">
							<Input
								type="email"
								placeholder="Place your email address"
								className="max-w-xs bg-ffffff"
							/>
							<Button type="submit">Submit</Button>
						</div>
					</div>

					{/* Right side */}
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
						<Link href="/about" className="hover:underline">
							About
						</Link>
						<Link href="/team" className="hover:underline">
							Our Team
						</Link>
						<Link href="/gallery" className="hover:underline">
							Gallery
						</Link>
						<Link href="/collections" className="hover:underline">
							Collections
						</Link>
						<Link href="/resources" className="hover:underline">
							Resources
						</Link>
						<Link href="/privacy" className="hover:underline">
							Privacy Policy
						</Link>
						<Link href="/faq" className="hover:underline">
							FAQ
						</Link>
						<Link href="/contact" className="hover:underline">
							Contact
						</Link>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-12 text-sm text-gray-600 md:text-left text-center">
					© 2025 byteuth
				</div>
			</div>
		</footer>
	);
};

export default Footer;
