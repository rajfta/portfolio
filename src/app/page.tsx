import { client } from "../sanity/lib/client";
import {
	ABOUTS_QUERY,
	WORKS_QUERY,
	SKILLS_QUERY,
	EXPERIENCES_QUERY,
} from "../sanity/lib/queries";
import {
	About,
	Footer,
	Landing,
	Skills,
	Works,
} from "../../components/sections";

export default async function HomePage() {
	const abouts = await client.fetch(ABOUTS_QUERY);
	const works = await client.fetch(WORKS_QUERY);
	const allSkills = await client.fetch(SKILLS_QUERY);
	const experiences = await client.fetch(EXPERIENCES_QUERY);

	const skills = { skills: allSkills, experiences };

	return (
		<div className="relative bg-primary">
			<Landing />
			<About abouts={abouts} />
			<Works works={works.reverse()} />
			<Skills skills={skills} />
			<Footer />
		</div>
	);
}
