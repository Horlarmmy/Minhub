import Link from "next/link";
import pinata from "../pages/getstarted/images/pinata.png";
import NFTstorage from "../pages/getstarted/images/NFTstorage.png";
import Image from "next/image";
import { viewProjects, noOfProjects } from "../pages/api/minhub";

export function Step1({ formik, handleChange }) {
  return (
    <>
      <h1 className="text-3xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
        Contract Information
      </h1>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <p className="text-sm text-slate-400 my-2">
            This is the name of your project. it will appear whenever your
            collection is mentioned
          </p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your NFT name"
            required
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="token"
          >
            Token Symbol
          </label>
          <p className="text-sm text-slate-400 my-2">
            This is the token symbol for your project. For example; ETH
          </p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="token"
            type="text"
            placeholder="Token Symbol"
            required
            onChange={handleChange}
            value={formik.values.token}
          />
        </div>
        <div className="mb-4 mt-4">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <p className="text-sm text-slate-400 my-2">
            This is the description of your project. You can change it anytime.
          </p>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline h-[121px]"
            id="description"
            type="text"
            placeholder="All about your project"
            required
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="mb-4 mt-4">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="website"
          >
            Website
          </label>
          <p className="text-sm text-slate-400 my-2">
            This is the URl in which minters can learn about your project{" "}
          </p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="website"
            type="url"
            placeholder="URL to your website"
            required
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </div>
        <div className="mb-4 mt-4">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="royalties"
          >
            Royalties
          </label>
          <p className="text-sm text-slate-400 my-2">
            This is the % royalties you will collect on secondary sales
          </p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="royalties"
            type="number"
            placeholder="%"
            required
            onChange={formik.handleChange}
            value={formik.values.royalties}
          />
        </div>
      </div>
    </>
  );
}
export function Step2({ formik }) {
  return (
    <>
      <h1 className="text-3xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
        Contract Features
      </h1>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-4">
        <div className="mb-4 mt-5 border shadow-md p-5 rounded-lg">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="mintspertrans"
          >
            Mints per Transaction
          </label>
          <input
            className="shadow appearance-none border rounded w-45 py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="mintspertrans"
            type="number"
            placeholder="1"
            required
            onChange={formik.handleChange}
            value={formik.values.mintspertrans}
          />
          <p className="text-sm text-slate-400 pt-3 my-2">
            Specify the maximum number of NFTs that can be minted per
            transaction. This can be updated at any time after deployment.{" "}
          </p>
        </div>
        <div className="mb-4 mt-5 border shadow-md p-5 rounded-lg">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="tokensupply"
          >
            Token Supply
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="tokensupply"
            type="number"
            placeholder="Amount of supply"
            required
            onChange={formik.handleChange}
            value={formik.values.tokensupply}
          />
          <p className="text-sm text-slate-400 pt-3 my-2">
            This is the total number of NFTs in your collection. You cannot
            change this once deployed
          </p>
        </div>

        <div className="mb-4 mt-5 border shadow-md p-5 rounded-lg">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="mintprice"
          >
            Mint Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="mintprice"
            type="number"
            placeholder="ex: 1"
            required
            onChange={formik.handleChange}
            value={formik.values.mintprice}
          />
          <p className="text-sm text-slate-400 pt-3 my-2">
            Set the base price (in ETH) of your NFTs. Type =0= if you want them
            to be free of charge. This can be updated at any time after
            deployment.
          </p>
        </div>
        <div className="mb-4 border mt-5 shadow-md p-5 rounded-lg">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="walletmintlimit"
          >
            Wallet Mint Limit
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="walletmintlimit"
            type="number"
            placeholder="ex: 1"
            required
            onChange={formik.handleChange}
            value={formik.values.walletmintlimit}
          />
          <p className="text-sm text-slate-400 pt-3 my-2">
            Specify the maximum number of NFTs that can be minted per wallet.
            This can be updated at any time after deployment.
          </p>
        </div>
      </div>
    </>
  );
}
export function Step3({ formik }) {
  return (
    <>
      <h1 className="text-3xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
        Upload Content
      </h1>
      <p className="text-md text-slate-200 font-medium pt-3 my-3">
        To make your project completely decentralized, we recommend using IPFS
        file storage. For most cases, it's free, and uploading takes a minimum
        of time. Below are two optimal ways to upload files to IPFS
      </p>
      <p className="text-md text-slate-200 font-medium pt-3 my-3">
        After uploading, you will have access to the the special identifier
        (CID) for the folder with your content. This folder should contain your
        images labeled 1.png, 2.png ... where each image matches uts token id.
      </p>
      <p className="text-md text-slate-200 font-medium pt-2">
        Choose one of the tools. Click to find out more details.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Link
          href="https://www.pinata.cloud/"
          className="cursor-pointer"
          target="_blank"
        >
          <div className="mb-4 py-6 flex mt-5 border active:shadow-lg shadow-md p-5 rounded-lg">
            <Image src={pinata} alt="PINATA" className="w-36 h-32" />
            <div className="mt-4 ml-4">
              <p className="text-xl text-slate-50 font-medium pt-2">Pinata</p>
              <p className="text-sm text-slate-400 pt-2">
                pinata is a premium IPFS service provider that gives you
                decentralized hosting, first 100 files or 1GB free
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="https://nft.storage/"
          className="cursor-pointer"
          target="_blank"
        >
          <div className="mb-4 flex mt-5 border active:shadow-lg shadow-md p-6 rounded-lg">
            <Image src={NFTstorage} alt="NFT STORAGE" className="w-36 h-32" />
            <div className="mt-2 ml-4">
              <p className="text-xl text-slate-50 font-medium pt-2">
                NFT.Storage
              </p>
              <p className="text-sm text-slate-400 pt-2">
                NFT.Storage is a no-frills open source tool to upload your NFTs
                directly to IPFS.
                <br />
                NFT.Storage is free to use.
              </p>
            </div>
          </div>
        </Link>

        <div className="mb-4  mt-5 ">
          <label
            className="block text-slate-200 text-xl font-bold mb-2"
            htmlFor="contentfileextension"
          >
            Content File Extension
          </label>
          <p className="text-sm text-slate-400 my-2">
            Upload the image for your project content. Only accept .png,
            .jpeg extensions
          </p>
          <input
            className="shadow  appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            multiple
            accept=".png, .jpeg"
            placeholder=".png, .jpeg"
            required
            onChange={(event) => {
              formik.setFieldValue("image", event.target.files[0]);
            }}
            />
            {formik.errors.image ? <div className="text-slate-300 mt-4">{formik.errors.image}</div> : null}
        </div>
      </div>
    </>
  );
}
// export function Step4({ formik }) {
//   return (
//     <>
//       <h1 className="text-3xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
//         Upload Metadata
//       </h1>
//       <p className="text-md text-slate-200 font-medium pt-3 my-3">
//         It's god practice to add metadata to your collection. This metadata can
//         be used by marketplaces to display the features of each item in your
//         collection. Below is an example of how the metadata file for each item
//         in the collection should look like.
//       </p>
//       <p className="text-md text-slate-200 font-medium pt-3 my-3">
//         Upload your folder with metadata to IPFS like you did with content and
//         provide folder CID. Each file should match a token number - for example;
//         1.png's metadata should have a matching 1.json like here.
//       </p>

//       <textarea
//         className="text-md p-28 px-16  bg-zinc-200  text-slate-600 font-medium pt-10 h-[200px] w-full"
//         id="metadatajson"
//         type="text"
//         placeholder='{&#10;"name": "name #1",&#10;
//         "description": "description #1",&#10;"attributes": [...],&#10;"images": "ipfs://_YOUR_CONTENT_FOLDER_CID_/1.png",&#10;//anything else you want to add&#10;}'
//         required
//         onChange={formik.handleChange}
//         value={formik.values.metadatajson}
//       ></textarea>
//       <p className="underline text-md text-slate-50 font-semibold">
//         <a href="#" target="_blank">
//           Download sample
//         </a>
//       </p>

//       <div className="mb-4 mt-5 ">
//         <label
//           className="block text-slate-200 text-xl font-bold mb-2"
//           htmlFor="contentfolderCID"
//         >
//           Metadata Folder CID
//         </label>
//         <p className="text-sm text-slate-400 my-2">
//           Provide CID for your content folder.
//         </p>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
//           id="metadatafolderCID"
//           type="text"
//           placeholder="Input CID"
//           required
//           onChange={formik.handleChange}
//           value={formik.values.metadatafolderCID}
//         />
//       </div>
//     </>
//   );
// }
export function Step4({ formik }) {
  return (
    <>
      <h1 className="text-3xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
        Deploy Contract
      </h1>

      <div className="mb-4 mt-9 ">
        <h3 className="block text-slate-200 text-xl font-bold mb-2">
          Generate contract
        </h3>
        <p className="text-sm text-slate-400 my-2">
          Here you can generate and re-generate your contract. After it is
          generate you can then deploy
        </p>
        <div className="text-center flex items-center justify-center"></div>
        <button
          className="shadow-md active:bg-white active:text-gray-800 hover:bg-slate-200 hover:text-slate-400 appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-semibold text-slate-200 leading-tight  hover:shadow-outline active:shadow-lg "
          id="Generate contract"
          placeholder="Generate contract"
          required
          type="button"
        >
          Generate $NFT Contract
        </button>
      </div>
      <div className="mb-4 mt-11 ">
        <h3 className="block text-slate-200 text-xl font-bold mb-2">Testnet</h3>
        <p className="text-sm text-slate-400 my-2">
          Deploy Contract to Testnet
        </p>
        <div className="text-center flex items-center justify-center"></div>
        <button
          className="shadow-md active:bg-white active:text-gray-800 hover:bg-slate-200 hover:text-slate-400 appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-semibold text-slate-200 leading-tight  hover:shadow-outline active:shadow-lg "
          id="Generate contract"
          placeholder="Generate contract"
          required
          type="submit"
          disabled={formik.isSubmitting}
        >
          Generate on Testnet
        </button>
      </div>
    </>
  );
}

export function Step5({ setCurrentStep, nftAddress, formik }) {
  return (
    <>
      <h1 className="text-3xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
        Deploy Contract
      </h1>

      <div className="mb-4 mt-9 ">
        <h3 className="block text-slate-200 text-xl font-bold mb-2">
          Generate contract
        </h3>
        <p className="text-sm text-slate-400 my-2">
          Here you can generate and re-generate your contract. After it is
          generated you can then deploy
        </p>
        <div className="text-center flex items-center justify-center"></div>
        <button
          className="shadow-md appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-semibold text-slate-200 leading-tight  hover:shadow-outline active:shadow-lg "
          id="Generate contract"
          placeholder="Generate contract"
          required
          disabled
        >
          Generate $NFT Contract
        </button>
      </div>
      <div className="mb-4 mt-11 ">
        <h3 className="block text-slate-200 text-xl font-bold mb-2">Testnet</h3>
        <p className="text-sm text-slate-400 my-2">
          Deploy Contract to Testnet
        </p>
        <div className="text-center flex items-center justify-center"></div>
        <button
          className="shadow-md appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-semibold text-slate-200 leading-tight  hover:shadow-outline active:shadow-lg "
          id="Generate contract"
          placeholder="Generate contract"
          required
          disabled
        >
          Generate on Testnet
        </button>
      </div>
      <div className="text-center flex items-center justify-center">
        <h1 className="text-green-400 font-semibold">Deploy done</h1>
      </div>

      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-4">
        <div className="mb-4 mt-11  ">
          <p className="text-sm text-slate-400 my-2 text-center">
            Your contract on Fantom Scan
          </p>
          <div className="text-center flex items-center justify-center">
            <Link
              href={`https://testnet.ftmscan.com/address/${nftAddress}`}
              passHref
              legacyBehavior
            >
              <a
                target="_blank"
                href={`https://testnet.ftmscan.com/address/${nftAddress}`}
                className="shadow-md active:bg-white active:text-gray-800 hover:bg-slate-200 hover:text-slate-400 appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-semibold text-slate-200 leading-tight  hover:shadow-outline active:shadow-lg"
                disabled={formik.isSubmitting}
              >
                Fantom Scan
              </a>
            </Link>
          </div>
        </div>

        <div className="mb-4 mt-11 ">
          <p className="text-sm text-slate-400 my-2 text-center">
            Analytics of your contract
          </p>
          <div className="text-center flex items-center justify-center">
            <Link href="#" onClick={() => setCurrentStep(7)}>
              <button
                className="shadow-md active:bg-white active:text-gray-800 hover:bg-slate-200 hover:text-slate-400 appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-semibold text-slate-200 leading-tight  hover:shadow-outline active:shadow-lg"
                disabled={formik.isSubmitting}
              >
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function Step6({ metadata, token, name, nftAddress, formik }) {
  return (
    <>
      <h1 className="text-4xl text-slate-50 font-medium mb-4 ml-4 -mt-5">
        Dashboard(Testnet)
      </h1>

      <div className="mb-4 mt-9 ">
        <h3 className="block text-slate-200 text-xl font-bold mb-2">
          Deployed contract information
        </h3>
        <hr className="w-96 border-2 border-slate-200" />
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="text-md text-slate-400 pb-2 pt-3 my-2">
              Token Name
            </h3>
            <p className="text-sm text-slate-50 my-2 mx-3 text-left">{name}</p>
            <h3 className="text-md text-slate-400 pb-8 pt-3 my-2">
              Contract Address
            </h3>
            <a
              target="_blank"
              href={`https://sepolia.scrollscan.dev/address/${nftAddress}`}
              className="text-sm text-slate-50 my-2 mx-3 text-left hover:underline hover:text-blue-600 "
            >
              {nftAddress}
            </a>
          </div>
          <div>
            <h3 className="text-md text-slate-400 pb-2 pt-3 my-2">
              Token Symbol
            </h3>
            <p className="text-sm text-slate-50 my-2 mx-4 text-left">{token}</p>
            <h3 className="text-md text-slate-400 pb-7 pt-3 my-2">
              Metadata URL
            </h3>
            <a
              target="_blank"
              href={`https://ipfs.io/ipfs/${metadata}/metadata.json`}
              className="text-xs text-slate-50 pt-6 text-left hover:underline hover:text-blue-600"
            >
              {`https://ipfs.io/ipfs/${metadata}`}
            </a>
          </div>
        </div>

        <div className="mb-4 mt-12 ">
          <h3 className="block text-slate-200 text-xl font-bold mb-2">
            Withdraw Revenue
          </h3>
          <hr className="w-96 border-2 border-slate-200" />
          <p className="text-md text-slate-400 my-2">
            Withdraw your contract revenue here.
          </p>
          <Link href="#">
            <button
              className="shadow-md active:bg-white active:text-gray-800 hover:bg-slate-200 hover:text-slate-400 appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-medium text-slate-50 leading-tight  hover:shadow-outline active:shadow-lg"
              disabled={formik.isSubmitting}
            >
              Withdraw
            </button>
          </Link>
        </div>
        <div className="mb-4 mt-12 ">
          <h3 className="block text-slate-200 text-xl font-bold mb-2">
            Project
          </h3>
          <hr className="w-96 border-2 border-slate-200" />
          <p className="text-md text-slate-400 my-2">
            View your available project here.
          </p>
          <Link href={"/getstarted/project"}>
            <button
              className="shadow-md active:bg-white active:text-blue-600 hover:bg-slate-200 hover:text-slate-400 appearance-none border w-96 ml-9 mt-4 rounded py-3 px-3 font-medium text-slate-50 leading-tight  hover:shadow-outline active:shadow-lg"
              disabled={formik.isSubmitting}
            >
              Project
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export function Step7() {
  return (
    <>
      <h1 className="text-4xl text-slate-100 font-medium mb-4 ml-4 -mt-5">
        Button Settings
      </h1>
      <p className="block text-slate-400 text-sm font-bold mb-2">
        This will only be available for the networks you have already deployed
        your contract on your contract.
      </p>
      <div className="mb-4 mt-9 ">
        <h3 className="text-slate-200 text-xl font-bold mb-2">Settings</h3>
        <hr className="w-96 border-2 border-slate-200" />

        <div>
          <h3 className="text-2xl text-slate-400 font-bold my-3 pt-3 mt-2">
            Open Mint
          </h3>
          <p className="text-slate-400 text-sm font-semibold mb-2">
            Go to the project page to mint your available NFT.
          </p>
          <div className="text-center flex items-center justify-start">
            <Link href={"/getstarted/project"}>
              <button className="text-md bg-green-400 text-black  p-5 my-2 shadow-md appearance-none border w-32 mt-4 rounded py-3 px-3 font-semibold  leading-tight  active:bg-black active:text-white hover:bg-green-300 transition duration-200 ease-in   hover:shadow-outline active:shadow-lg">
                Mint
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
