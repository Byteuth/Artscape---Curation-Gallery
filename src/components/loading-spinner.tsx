"use client";

import { Loader2 } from "lucide-react";

export default function GradientLoadingSpinner() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg flex flex-col items-center space-y-4">
			<div className="flex items-center space-x-2 text-sm text-gray-800">
				<Loader2 className="h-4 w-4 animate-spin" />
				<p className="text-lg font-semibold text-gray-800">Loading...</p>
			</div>
		</div>
	);
}
