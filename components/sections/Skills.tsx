import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { SkillsType } from '../../types/sanity';

import Tooltip from '../Tooltip';

import { MotionWrapper, Wrapper } from '../wrappers';

type SkillsProps = {
  skills: SkillsType;
};

const Skills = ({ skills: { experiences, skills } }: SkillsProps) => {
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>(
    {}
  );

  const orderedExperiences = experiences.sort((a, b) => {
    return new Date(b.year!).getTime() - new Date(a.year!).getTime();
  });

  return (
    <MotionWrapper>
      <Wrapper idName="skills">
        <div className="flex flex-col items-center justify-center mt-16 md:mt-0">
          <h2 className="head-text">Skills & Experiences</h2>

          <div className="flex flex-col w-4/5 mt-12 lg:flex-row">
            <motion.div className="flex flex-[5] flex-wrap items-center justify-center lg:mr-20 lg:items-start lg:justify-start">
              {skills.map((skill) => (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center m-4 text-center transition-all duration-300 ease-in-out "
                  key={skill.name}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fef4f5] transition-colors duration-300 ease-in-out hover:bg-[transparent] sm:h-24 sm:w-24">
                    <div className="relative w-1/2 h-1/2">
                      <Image
                        src={skill.icon!.asset!.url!}
                        layout="fill"
                        objectFit="cover"
                        alt={skill.name!}
                      />
                    </div>
                  </div>
                  <p className="mt-2 font-medium p-text 2xl:mt-4">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-[2] flex-col items-start justify-start md:mt-0">
              {orderedExperiences.map((experience) => (
                <motion.div
                  className="flex flex-row items-start justify-start w-full my-4"
                  key={experience.year}
                >
                  <div className="mr-4 sm:mr-12">
                    <p className="font-extrabold bold-text text-secondary">
                      {experience.year}
                    </p>
                  </div>
                  <motion.div className="flex flex-col items-start justify-start w-full mb-4 cursor-default">
                    {experience.works!.map((work) => (
                      <div key={work!.name}>
                        <motion.div
                          onMouseEnter={() =>
                            setShowTooltip({ [work!.name!]: true })
                          }
                          onMouseLeave={() =>
                            setShowTooltip({ [work!.name!]: false })
                          }
                          whileInView={{ opacity: [0, 1] }}
                          transition={{ duration: 0.5 }}
                          className="relative flex flex-col items-start justify-start w-full mb-4 cursor-pointer"
                          data-tip
                          data-for={work!.name}
                        >
                          <h4 className="font-medium bold-text">
                            {work!.name}
                          </h4>
                          <p className="p-text mt-1.5 font-normal text-gray">
                            {work!.company}
                          </p>
                          <Tooltip show={showTooltip[work!.name!]}>
                            {work!.desc}
                          </Tooltip>
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </MotionWrapper>
  );
};

export default Skills;
