import Image from 'next/image';
import Nftcol from './images/NFTcollection.png';
import logo from './images/minhub.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { providers } from 'ethers';

export default function started() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const handleClick = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      })
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsConnected(true);
      const account = await accounts[0];
      setAccount(account);
   
      // console.log(account);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
            });
        } catch (addError) {
            // handle "add" error
            console.log(addError);
        }
      }
    }
  };


  const handleDisconnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      alert("Are you sure you want to disconnect?");
      setIsConnected(false);
      setAccount(null);
    }
  };

  return (
    <div className="bg-[#d7eff3] h-[920px]">
      <nav
        className="flex h-9 px-8 py-14 items-center justify-between"
        aria-label="Global"
      >
        <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MinHub</span>
            <Image className="h-20 w-20" src={logo} alt="logo" />
          </a>
        </div>

        <div
          className="lg:inline-flex"
          onClick={isConnected ? handleDisconnect : handleClick}
        >
          <button className="rounded-full flex  justify-around items-center px-6 py-4 text-2xl font-semibold leading-6 text-white bg-blue-700 shadow-sm ring-1 ring-gray-900/10 active:ring-gray-900/20 focus:ring-2 active:ring-blue-500 active:ring-offset-2">
            <span className="ml-2">
              {isConnected ? `${account.slice(0, 8)}...` : "Connect Wallet"}
            </span>
          </button>
        </div>
      </nav>
      <div className="  justify-center items-center">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Projects
        </h2>
      </div>
      <div className="flex items-center justify-center  mt-12 mx-auto text-center">
        <Link
          href={isConnected ? "/getstarted/form" : "#"}
          legacyBehavior
          passHref
        >
          <a>
            <button
              onClick={() => {
                if (!isConnected) {
                  alert("Please connect to your wallet before you proceed");
                }
              }}
              className=" mx-auto text-center w-44 justify-center items-center rounded-md border border-transparent bg-blue-600 py-4 px-4 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add new project
            </button>
          </a>
        </Link>
        <Link
          href={isConnected ? "/getstarted/project" : "#"}
          legacyBehavior
          passHref
        >
          <a>
            <button
              onClick={() => {
                if (!isConnected) {
                  alert("Please connect to your wallet before you proceed");
                }
              }}
              className=" mx-auto text-center w-44 justify-center items-center rounded-md border border-transparent bg-blue-600 py-4 px-4 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-8 focus:ring-offset-2"
            >
              View Project
            </button>
          </a>
        </Link>
      </div>
      <p className="mx-auto pl-2 mt-6 max-w-2xl text-center font-bold text-lg leading-8 text-gray-600">
        Click on "Add new project" button to create new ERC20/ERC721 (NFT)
        Collection
      </p>
      <div className=" flex items-center mt-8">
        <Image
          className="mx-auto text-center justify-center"
          src={Nftcol}
          alt="NFT Collection"
          placeholder="blur"
        />
      </div>
    </div>
  );
}
