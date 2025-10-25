import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
	console.error("❌ Missing required environment variables:");
	if (!projectId) console.error("   - NEXT_PUBLIC_SANITY_PROJECT_ID");
	if (!dataset) console.error("   - NEXT_PUBLIC_SANITY_DATASET");
	if (!token) console.error("   - SANITY_API_WRITE_TOKEN");
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	useCdn: false,
	token,
	apiVersion: "2025-10-22",
});

const seedData = async () => {
	console.log("🌱 Starting Sanity seed...");

	try {
		// 1. Seed Abouts (Professional Summary)
		console.log("📝 Creating About sections...");
		const abouts = [
			{
				_type: "abouts",
				title: "Full Stack Development",
				description:
					"Specialized in architecting scalable web applications with expertise in React, Next.js, and Node.js. Building sophisticated solutions at the intersection of modern web development and emerging technologies.",
			},
			{
				_type: "abouts",
				title: "Web3 & Blockchain",
				description:
					"Experienced in developing smart contracts with Solidity and building blockchain-integrated applications. Led projects in crypto accounting and DeFi platforms.",
			},
			{
				_type: "abouts",
				title: "AI Integration",
				description:
					"Leading AI adoption initiatives and implementation strategies. Working with OpenAI and Claude APIs to integrate cutting-edge AI capabilities into production applications.",
			},
			{
				_type: "abouts",
				title: "Cloud Architecture",
				description:
					"Expert in deploying and managing applications on AWS, including Lambda functions, serverless architectures, and scalable cloud solutions.",
			},
		];

		for (const about of abouts) {
			await client.create(about);
			console.log(`✅ Created: ${about.title}`);
		}

		// 2. Seed Skills
		console.log("\n💪 Creating Skills...");
		const skills = [
			{ name: "React", bgColor: "#61DAFB" },
			{ name: "Next.js", bgColor: "#000000" },
			{ name: "TypeScript", bgColor: "#3178C6" },
			{ name: "Node.js", bgColor: "#339933" },
			{ name: "GraphQL", bgColor: "#E10098" },
			{ name: "PostgreSQL", bgColor: "#4169E1" },
			{ name: "MongoDB", bgColor: "#47A248" },
			{ name: "Web3", bgColor: "#F16822" },
			{ name: "Solidity", bgColor: "#363636" },
			{ name: "AWS", bgColor: "#FF9900" },
			{ name: "Smart Contracts", bgColor: "#627EEA" },
			{ name: "OpenAI API", bgColor: "#412991" },
			{ name: "Claude API", bgColor: "#D97757" },
			{ name: "React Native", bgColor: "#61DAFB" },
			{ name: "AstroJS", bgColor: "#FF5D01" },
		];

		for (const skill of skills) {
			await client.create({
				_type: "skills",
				...skill,
			});
			console.log(`✅ Created skill: ${skill.name}`);
		}

		// 3. Seed Work Experiences
		console.log("\n💼 Creating Work Experiences...");
		const experiences = [
			{
				_type: "experiences",
				year: "2023-Present",
				works: [
					{
						_type: "workExperience",
						_key: "request-finance",
						name: "Senior Software Engineer",
						company: "Request.Finance",
						desc: "Leading frontend architecture and AI adoption. Architecting AWS-deployed web apps and developing Solidity smart contracts.",
					},
				],
			},
			{
				_type: "experiences",
				year: "2022-2023",
				works: [
					{
						_type: "workExperience",
						_key: "consola",
						name: "Full Stack Engineer",
						company: "Consola.Finance",
						desc: "Built web3 accounting solutions using T3 stack, AWS lambdas, and Ethereum blockchain integration.",
					},
				],
			},
			{
				_type: "experiences",
				year: "2021-2022",
				works: [
					{
						_type: "workExperience",
						_key: "docler-senior",
						name: "Frontend Software Engineer",
						company: "Docler Holding",
						desc: "Designed scalable applications using NextJS, GraphQL, and TypeScript. Led production issue resolution.",
					},
				],
			},
			{
				_type: "experiences",
				year: "2019-2021",
				works: [
					{
						_type: "workExperience",
						_key: "docler-junior",
						name: "Junior Software Engineer",
						company: "Docler Holding",
						desc: "Collaborated on React, Redux, Node, and Express projects. Developed testable, maintainable code.",
					},
				],
			},
		];

		for (const exp of experiences) {
			await client.create(exp);
			console.log(`✅ Created experience: ${exp.year}`);
		}

		// 4. Seed Works (Projects)
		console.log("\n🚀 Creating Project Works...");
		const works = [
			{
				_type: "works",
				title: "Portfolio Website",
				description:
					"Personal portfolio built with Next.js, Sanity CMS, and Framer Motion. Features smooth scroll animations and a modern design.",
				projectLink: "https://www.rajfta.dev/",
				codeLink: "https://github.com/rajfta",
				tags: ["NextJS", "UI/UX", "Web Design"],
			},
			{
				_type: "works",
				title: "SIMPL Education",
				description:
					"Crypto educational platform by Rug DAO. Teaching blockchain fundamentals and DeFi concepts to newcomers.",
				projectLink: "https://www.simpl.education/",
				tags: ["Web3", "NextJS", "Education"],
			},
			{
				_type: "works",
				title: "Dewa Company Website",
				description:
					"Modern corporate website with clean design and smooth user experience. Built with latest web technologies.",
				projectLink: "https://dewa.hu/",
				tags: ["UI/UX", "Web Design"],
			},
			{
				_type: "works",
				title: "VertMind Platform",
				description:
					"Platform development for mental health and wellness services. Focus on user experience and accessibility.",
				projectLink: "https://vertmind.com",
				tags: ["NextJS", "UI/UX"],
			},
			{
				_type: "works",
				title: "Docler Holding",
				description:
					"Corporate website for international holding company. Built scalable architecture handling high traffic.",
				projectLink: "https://doclerholding.com/",
				tags: ["NextJS", "Enterprise"],
			},
			{
				_type: "works",
				title: "Blueberry Garden",
				description:
					"Web3 DeFi project with smart contract integration. Features token staking and yield farming mechanisms.",
				projectLink: "https://www.blueberry.garden/",
				tags: ["Web3", "NextJS", "Smart Contracts"],
			},
			{
				_type: "works",
				title: "Request Finance",
				description:
					"Crypto invoicing and payment platform. Integrated multiple blockchain networks and payment providers.",
				projectLink: "https://request.finance",
				tags: ["Web3", "NextJS", "Fintech"],
			},
			{
				_type: "works",
				title: "Consola Finance",
				description:
					"Web3 accounting and tax solution for crypto traders. Real-time portfolio tracking and tax reporting.",
				projectLink: "https://consola.finance",
				tags: ["Web3", "Graphql", "Fintech"],
			},
		];

		for (const work of works) {
			await client.create(work);
			console.log(`✅ Created project: ${work.title}`);
		}

		console.log("\n✨ Seed completed successfully!");
		console.log("\n📊 Summary:");
		console.log(`   - ${abouts.length} About sections created`);
		console.log(`   - ${skills.length} Skills created`);
		console.log(`   - ${experiences.length} Experience periods created`);
		console.log(`   - ${works.length} Projects created`);
		console.log(
			"\n🎉 Your Sanity database is now populated with content from your CV!",
		);
	} catch (error) {
		console.error("❌ Error seeding data:", error);
		throw error;
	}
};

seedData()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
