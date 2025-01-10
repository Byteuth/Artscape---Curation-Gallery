import Image from "next/image";

export default function Hero() {
	return (
		<div className="bg-[#ebefe0] flex flex-col justify-center items-center py-16 px-6 w-full shadow-lg">
			<div className="mx-auto lg:px-8">
				<div className="text-center mb-12">
					<h1 className="md:text-8xl text-4xl  font-bold mb-2">
						Through the Canvas
					</h1>
					<p className="text-l md:text-4xl text-center mx-auto md:translate-x-12 lg:translate-x-24">
						by -t Uth
					</p>
				</div>
				<div className="flex flex-col md:flex-row items-center gap-8 ">
					<div className="w-full md:w-1/2 flex justify-center relative">
						<div className="relative">
							<Image
								src="/images/winter-landscape.jpg"
								alt="Through the Canvas"
								width={600}
								height={300}
								className="rounded-lg shadow-right-bottom"
							/>
							<div className="absolute top-0 left-0 lg:text-sm text-xs lg:-translate-y-5 -translate-y-3  translate-x-1 rounded-sm ">
								PAINTING
							</div>
							<div className="absolute top-0 right-0 lg:text-sm text-xs lg:-translate-y-5 -translate-y-3  -translate-x-1 selection:rounded-sm">
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
