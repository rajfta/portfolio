import { GetStaticProps } from 'next';
import Head from 'next/head';

import { sdk } from '../client';
import { About, Footer, Landing, Skills, Works } from '../components/sections';
import { AboutsType, SkillsType, WorksType } from '../types/sanity';

type HomeProps = {
  abouts: AboutsType;
  works: WorksType;
  skills: SkillsType;
};

const Home = ({ abouts, works, skills }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Rajfta Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative bg-primary">
        <Landing />
        <About abouts={abouts} />
        <Works works={works} />
        <Skills skills={skills} />
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { allAbouts: abouts } = await sdk().About();

  const { allWorks: works } = await sdk().Work();

  const { allSkills, allExperiences: experiences } = await sdk().Skill();
  const skills = { skills: allSkills, experiences };

  return {
    props: { abouts, works: works.reverse(), skills },
  };
};

export default Home;
