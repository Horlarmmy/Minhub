import {
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  PlayIcon,
  QueueListIcon,
  ScaleIcon,
  UserGroupIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import logo from "../pages/getstarted/images/minhub.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import myImage from "../pages/getstarted/images/blocks.gif";

const features = [
  {
    name: "Scroll Blockchain",
    description:
      "One of the leading blockchains High efficiency along with low commissions.",
    icon: GlobeAltIcon,
  },
  {
    name: "ERC-721 contracts",
    description:
      "MinHub supports ERC-721 contract generation. Create efficient and purpose built contracts for your project in a few minutes.",
    icon: ScaleIcon,
  },
  {
    name: "Easy deployments",
    description:
      "No delay or confusion, click a single button and be live in one minute.",
    icon: BoltIcon,
  },
  {
    name: "Built for all",
    description:
      "Create collections of 100 or 10,000. MinHub provides you all the tools for a perfect lunch.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Minting Button",
    description:
      "MinHub takes your collection public with a simple embedded button that works on all no-code website builders.",
    icon: PlayIcon,
  },
  {
    name: "Own everything",
    description:
      "With MinHub you own everything. From contract to IPFS to mint button - your project is totally decentralized.",
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    name: "Analytics",
    description:
      "Get detailed metrics about who mints and owns your collection and recommendations on how to scale better.",
    icon: QueueListIcon,
  },
  {
    name: "Free for all",
    description:
      "MinHub is open for all. No payment upfront. No signup. Just connect your wallet and lunch.",
    icon: UserGroupIcon,
  },
  {
    name: "Marketplace ready",
    description:
      "Once launched your collection is automatically listed and compatible with all NFT marketplaces.",
    icon: BanknotesIcon,
  },
];

export default function Header() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingUp(currentScrollPos < prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#d7eff3]">
      <nav className="flex h-9 px-8 pt-12 items-center" aria-label="Global">
        <div
          className={`flex fixed top-0 left-0 w-full z-50 lg:min-w-0 lg:flex-1 ${
            isScrollingUp ? "bg-[#d7eff3]" : "bg-gray-200"
          }`}
          aria-label="Global"
        >
          <a href="/" className="-m-1.5 ml-5 p-1.5">
            <span className="sr-only">MinHub</span>
            <Image className="h-20 w-20" src={logo} alt="" />
          </a>
        </div>
      </nav>

        <div className="absolute top-0 h-full w-full bg-[url('https://bafybeih6zqkkml5z5t56igqbfcvgy6tuajixi5l6tgxedpkn5jrynxwvpy.ipfs.nftstorage.link/')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
      <div className=" py-24 sm:py-32 lg:py-40 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <motion.h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              Build NFT Collections without Code
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white">
              MinHub is a one-stop service for all NFT creators. MinHub allows
              you to generate and deploy a ERC-721 contract on the Scroll
              blockchain with any information and features. After the
              deployment, you can use mint button for integration, with which
              anyone can mint your NFT collection.
            </p>
            <div className="mt-8 flex gap-x-4 sm:justify-center">
              <Link href="/getstarted" legacyBehavior passHref>
                <a className="inline-block rounded-lg w-36 h-10 bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-700">
                  Get started
                  <span className="text-indigo-200" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </Link>

              <a
                href="#"
                className="inline-block w-36 h-10 rounded-lg px-4 py-1.5 text-base font-semibold leading-7 bg-slate-300 hover:bg-slate-900 hover:text-white text-gray-900 ring-1 ring-gray-800/10 hover:ring-gray-900/20"
              >
                Docs
                <span className="text-gray-400" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
          <hr className="mx-auto mt-20" />
          <div className="mt-20 ">
            <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 md:gap-y-16">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white sm:shrink-0">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="sm:min-w-0 sm:flex-1">
                    <p className="text-lg  leading-8 text-white font-bold">
                      {feature.name}
                    </p>
                    <p className="mt-2 text-base leading-7 text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
