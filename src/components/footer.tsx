export default function Footer() {
	return (
		<footer>
			<div className="bg-white border-t border-gray-200 px-6">
				<div className="container mx-auto text-center pt-2">
					<div className="flex justify-center space-x-6">
						<p className="text-gray-700  text-sm cursor-pointer">
							Terms of Service
						</p>
						<p className="text-gray-700 text-sm  cursor-pointer">
							Privacy Policy
						</p>
						<p className="text-gray-700 text-sm  cursor-pointer">Help</p>
						<p className="text-gray-700 text-sm  cursor-pointer">Gallery</p>
						<p className="text-gray-700 text-sm  cursor-pointer">Collections</p>
					</div>
					<div className="pt-2  text-sm text-gray-700">© 2025 byteuth</div>
				</div>
			</div>
		</footer>
	);
}
