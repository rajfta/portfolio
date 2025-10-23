import { type SchemaTypeDefinition } from "sanity";

import abouts from "./abouts";
import brands from "./brands";
import contact from "./contact";
import experiences from "./experiences";
import skills from "./skills";
import testimonials from "./testimonials";
import workExperience from "./workExperience";
import works from "./works";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		abouts,
		brands,
		contact,
		experiences,
		skills,
		testimonials,
		workExperience,
		works,
	],
};
