import Image from "next/image";

export default function Hero() {
	return (
		<div className="bg-[#ebefe0] flex flex-col justify-center items-center p-16 w-full">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h1 className="text-8xl md:text-12xl font-bold mb-2">
						Through the Canvas
					</h1>
					<p className="text-2xl md:text-4xl text-center mx-auto md:translate-x-12 lg:translate-x-24">
						by -t Uth
					</p>
				</div>
				<div className="flex flex-col md:flex-row items-center gap-8 w-full">
					<div className="w-full md:w-1/2 flex justify-center relative">
						<div className="relative">
							<Image
								src="/images/winter-landscape.jpg"
								alt="Through the Canvas"
								width={600}
								height={300}
								className="rounded-lg shadow-md"
							/>
							<div className="absolute top-0 left-0 text-sm -translate-y-5  translate-x-1 rounded-sm">
								PAINTING
							</div>
							<div className="absolute top-0 right-0 text-sm -translate-y-5  -translate-x-1 selection:rounded-sm">
								BASED IN ITALY
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<p className="text-lg md:text-xl text-black">
							Through the Canvas is a free online resource that brings together
							arts and culture communities to find, share, collaborate, and
							reimagine cultural narratives.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
