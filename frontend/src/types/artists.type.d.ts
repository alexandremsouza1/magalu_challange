export type GetArtists = {
	range: string;
	limit: number;
	offset: number;
};

export type Artist = {
	id: string;
	name: string;
	image: string;
	date: string;
};
