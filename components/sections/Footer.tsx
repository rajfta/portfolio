import Image from 'next/image';
import { useCallback, useState } from 'react';
import axios from 'axios';

import { MotionWrapper, Wrapper } from '../wrappers';

type ContactProps = {
  isFormSubmitted: boolean;
  error: boolean;
  loading: boolean;
  name: string;
  email: string;
  message: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeInput: (e: any) => void;
  handleSubmit: () => void;
};

const Contact = ({
  error,
  name,
  message,
  loading,
  email,
  handleChangeInput,
  handleSubmit,
  isFormSubmitted,
}: ContactProps) => {
  if (error) {
    return (
      <div>
        <h3 className="head-text">
          Some error happened. Please try again later!
        </h3>
      </div>
    );
  }

  if (!isFormSubmitted) {
    return (
      <div className="mx-8 flex min-w-[300px] flex-col items-center justify-center md:my-4 md:w-3/5">
        <div className="flex items-center justify-center w-full my-3 transition-all duration-300 ease-in-out cursor-pointer rounded-xl bg-primary hover:shadow-sm hover:shadow-slate-300">
          <input
            className="w-full p-4 rounded-lg outline-none bg-slate-200 text-gray focus:ring-2 focus:ring-secondary"
            type="text"
            placeholder="Your Name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex items-center justify-center w-full my-3 transition-all duration-300 ease-in-out cursor-pointer rounded-xl bg-primary hover:shadow-sm hover:shadow-slate-300">
          <input
            className="w-full p-4 rounded-lg outline-none bg-slate-200 text-gray focus:ring-2 focus:ring-secondary"
            type="email"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex items-center justify-center w-full my-3 transition-all duration-300 ease-in-out cursor-pointer rounded-xl bg-primary hover:shadow-sm hover:shadow-slate-300">
          <textarea
            className="w-full p-4 rounded-lg outline-none h-44 bg-slate-200 text-gray focus:ring-2 focus:ring-secondary"
            placeholder="Your Message"
            value={message}
            name="message"
            onChange={handleChangeInput}
          />
        </div>
        <button
          type="button"
          className="my-4 mb-12 w-full cursor-pointer rounded-xl border-0 bg-tertiary  px-8 py-4 font-medium text-white outline-none transition-[cubic-bezier(0.55_0.085_0.68_0.53)] hover:shadow-sm hover:shadow-secondary md:mb-4 md:mt-8 md:w-auto"
          onClick={handleSubmit}
        >
          {!loading ? 'Send Message' : 'Sending...'}
        </button>
      </div>
    );
  }
  return (
    <div>
      <h3 className="head-text">Thank you for getting in touch!</h3>
    </div>
  );
};

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = async () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const config = {
      method: 'post',
      url: `/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: contact,
    };

    try {
      // @ts-ignore
      const response = await axios(config);
      if (response.status == 200) {
        setLoading(false);
        setIsFormSubmitted(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error({ err });
      setLoading(false);
      setFormError(true);
    }
  };

  // TODO: more work

  return (
    <MotionWrapper>
      <Wrapper idName="contact">
        <div className="flex flex-col items-center justify-center mt-16 md-mt-0">
          <div className="flex gap-4">
            <h2 className="-rotate-45 translate-y-1 select-none head-text">
              🤙
            </h2>
            <h2 className="head-text">Contact me</h2>
            <h2 className="-rotate-45 translate-y-1 select-none head-text">
              🤙
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center w-full mx-8 mt-6 mb-8 md:mt-16 md:w-3/5 md:flex-row md:gap-32">
            <div className="mt-4 mb-2 flex min-w-[300px] cursor-pointer items-center justify-start rounded-xl bg-[#faebed] p-4 pr-8 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_2px_2px_#f5e3e5] sm:w-auto md:w-full">
              <div className="relative w-10 h-10 mx-3">
                <Image
                  src="/images/mail.png"
                  alt="email"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <a href="mailto:rajfta@gmail.com" className="font-medium p-text">
                rajfta@gmail.com
              </a>
            </div>
            <a
              href="tel:+36 (20) 96-06333"
              className="my-4 flex min-w-[300px] cursor-pointer items-center justify-start rounded-xl bg-slate-200 p-4 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_2px_2px_#d6cdce58] sm:w-auto md:w-full"
            >
              <div className="relative w-10 h-10 mx-3">
                <Image
                  src="/images/mobile.png"
                  alt="phone"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <p className="p-text">+36 (20) 96-06333</p>
            </a>
          </div>
          <Contact
            isFormSubmitted={isFormSubmitted}
            error={formError}
            loading={loading}
            name={name}
            email={email}
            message={message}
            handleChangeInput={handleChangeInput}
            handleSubmit={handleSubmit}
          />
        </div>
      </Wrapper>
    </MotionWrapper>
  );
};

export default Footer;
