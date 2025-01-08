interface ArtworkPageProps {
	params: { slug: string };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
	return (
		<div>
			<h1>Artwork Details</h1>
			<p>Artwork ID or Slug: {params.slug}</p>
		</div>
	);
}
