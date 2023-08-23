type Recipe = {
	id: string;
	name: string;
	description: string;
	servingSize: number;
	cookingTime: number;
	skillLevel: string;
	instructions: Array<string>;
	ingredients: Array<string>;
	imageUrl: string;
};
