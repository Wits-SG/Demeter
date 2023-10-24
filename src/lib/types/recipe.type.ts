type Recipe = {
	id: string;
	postId: string;
	name: string;
	description: string;
	servingSize: number;
	cookingTime: number;
	skillLevel: string;
	instructions: Array<string>;
	ingredients: Array<string>;
	imageUrl: string;
};
