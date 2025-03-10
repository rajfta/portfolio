import React from 'react';
import { IconType } from 'react-icons';
import { BsTwitter } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const Instance = ({ Icon, href }: { Icon: IconType; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-6 h-6 my-1 transition-all duration-300 ease-in-out bg-white rounded-full cursor-pointer border-secondary text-gray hover:border-secondary hover:bg-secondary hover:text-white lg:my-2 lg:h-12 lg:w-12"
  >
    <Icon className="w-3 h-3 text-current lg:h-6 lg:w-6" />
  </a>
);

const SocialMedia = () => (
  <div className="absolute bottom-0 left-1 z-[2] flex flex-col items-center justify-end md:bottom-8 md:left-8">
    <Instance Icon={FaGithub} href="https://github.com/lendai-token" />
    <Instance Icon={BsTwitter} href="https://twitter.com/btak11" />
  </div>
);

export default SocialMedia;
