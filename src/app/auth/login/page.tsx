import LoginForm from "@/components/login-form";
import { Card } from "@/components/ui/card";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-green-100 to-green-200">
			<NavigationBar />
			<div className="flex flex-col gap-4 p-6 md:p-10 flex-grow justify-center items-center">
				<Card className="p-8 shadow-md">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</Card>
			</div>
			<Footer />
		</div>
	);
}
