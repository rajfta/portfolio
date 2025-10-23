'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

import { AboutsType } from '../../types/sanity';
import { MotionWrapper, Wrapper } from '../wrappers';

type AboutProps = {
  abouts: AboutsType;
};

const About = ({ abouts }: AboutProps) => {
  return (
    <MotionWrapper>
      <Wrapper idName="about">
        <div className="mt-16 flex flex-col md:mt-0">
          <h2 className="head-text normal-case">
            <span>Frontend</span> is my Swamp <br />
            <span>Decentralization</span> is my Fiona <br />
          </h2>

          <div className="mt-8 flex flex-wrap items-start justify-center">
            {abouts.map((about, index) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: 'tween' }}
                className="m-8 flex w-48 flex-col items-start justify-start 2xl:my-8 2xl:mx-8 2xl:w-64 "
                key={about.title! + index}
              >
                <div className="relative h-[170px] w-full overflow-hidden rounded-2xl 2xl:h-64">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={about.imgUrl!.asset!.url!}
                    alt={about.title!}
                  />
                </div>
                <h2 className="bold-text mt-5" style={{ marginTop: 20 }}>
                  {about.title}
                </h2>
                <p className="p-text mt-2.5" style={{ marginTop: 10 }}>
                  {about.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Wrapper>
    </MotionWrapper>
  );
};

export default About;
