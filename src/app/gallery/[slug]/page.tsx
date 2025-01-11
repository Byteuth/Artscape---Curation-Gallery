"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import ArtworkDisplay from "@/components/artwork-display";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { getArtworkById } from "../../actions/getArtworkById";

interface Artwork {
	copyright?: object;
	contextualtextcount?: number;
	creditline?: string;
	accesslevel?: number;
	dateoflastpageview?: string;
	classificationid?: number;
	division?: string;
	markscount?: number;
	publicationcount?: number;
	totaluniquepageviews?: number;
	contact?: string;
	colorcount?: number;
	rank?: number;
	id?: number;
	state?: object;
	verificationleveldescription?: string;
	period?: object;
	images?: object;
	worktypes?: object;
	imagecount?: number;
	totalpageviews?: number;
	accessionyear?: number;
	standardreferencenumber?: object;
	signed?: object;
	classification?: string;
	relatedcount?: number;
	verificationlevel?: number;
	primaryimageurl?: string;
	titlescount?: number;
	peoplecount?: number;
	style?: object;
	lastupdate?: string;
	commentary?: object;
	periodid?: object;
	technique?: string;
	edition?: object;
	description?: string;
	medium?: string;
	lendingpermissionlevel?: number;
	title?: string;
	accessionmethod?: string;
	colors?: object;
	provenance?: string;
	groupcount?: number;
	dated?: string;
	department?: string;
	dateend?: number;
	people?: object;
	url?: string;
	dateoffirstpageview?: string;
	century?: string;
	objectnumber?: string;
	labeltext?: object;
	datebegin?: number;
	culture?: string;
	exhibitioncount?: number;
	imagepermissionlevel?: number;
	mediacount?: number;
	objectid?: number;
	techniqueid?: number;
	dimensions?: string;
	seeAlso?: object;
}
export default function ArtworkPage() {
	const router = useRouter();
	const pathname = usePathname();
	const [artwork, setArtwork] = useState<Artwork[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchArtwork = async () => {
			const id = pathname.split("/").pop();
			try {
				const result = await getArtworkById(id);
				setArtwork(result);
			} catch (error) {
				console.error("Failed to fetch artwork:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchArtwork();
	}, [pathname]);


	if (loading) {
		return <div>Loading...</div>;
	}

	if (!artwork) {
		return <div>Artwork not found.</div>;
	}

	return (
		<div className="mx-auto overflow-x-hidden">
			<NavigationBar />

			<Button
				variant="ghost"
				className="md:m-4 m-2"
				onClick={() => router.back()}
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Gallery
			</Button>

			<div className="shadow-lg rotate-180">
				<div className="rotate-180">
					<ArtworkDisplay artwork={artwork[0]} />
				</div>
			</div>
			<Footer />
		</div>
	);
}
