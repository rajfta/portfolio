import { sdk } from '../../client'
import { About, Footer, Landing, Skills, Works } from '../../components/sections'

export default async function HomePage() {
  // Fetch data on the server
  const { allAbouts: abouts } = await sdk().About()
  const { allWorks: works } = await sdk().Work()
  const { allSkills, allExperiences: experiences } = await sdk().Skill()

  const skills = { skills: allSkills, experiences }

  return (
    <div className="relative bg-primary">
      <Landing />
      <About abouts={abouts} />
      <Works works={works.reverse()} />
      <Skills skills={skills} />
      <Footer />
    </div>
  )
}
