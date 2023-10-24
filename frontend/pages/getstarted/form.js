import { useEffect, useState } from "react";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
} from "../../components/Steps";
import Link from "next/link";
import { useFormik } from "formik";
import { NFTStorage, File } from "nft.storage";
import { useRouter } from "next/router";
import * as yup from "yup";
import { ContractFactory, ethers } from "ethers";
import nft from "../../utils/MinHub.json";
import { addProject} from "../api/minhub";

const features = {
  categories: [
    {
      name: "Settings",
      items: [
        { id: 1, name: "Information", href: "#" },
        { id: 2, name: "Features", href: "#" },
        { id: 3, name: "Upload Content", href: "#" },
        { id: 4, name: "Upload Metadata", href: "#" },
        { id: 5, name: "Deploy", href: "#" },
        { id: 6, name: "Testnet", href: "#" },
        { id: 7, name: "Dashboard", href: "#" },
        { id: 8, name: "Testnet confirm", href: "#" },
        { id: 9, name: "Mint", href: "#" },
        { id: 10, name: "Button Settings", href: "#" },
      ],
    },
  ],
};

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [metadata, setMetadata] = useState({});
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  // const [viewProject, setViewProject] = useState([]);

  const router = useRouter();

  const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    token: yup.string().required("Token is required"),
    description: yup.string().required("Description is required"),
    website: yup.string().required("Website is required"),
    royalties: yup
      .number()
      .positive()
      .integer()
      .required("Royalties must be a positive integer"),
    mintspertrans: yup.string().required("Mints per transaction is required"),
    tokensupply: yup
      .number()
      .positive()
      .integer()
      .required("Token supply must be a positive integer"),
    mintprice: yup
      .number()
      .positive()
      .integer()
      .required("Mint price is required"),
    walletmintlimit: yup
      .number()
      .positive()
      .integer()
      .required("Wallet mint limit is is required"),
    // contentfolderCID: yup.string().required(),
    image: yup
      .mixed()
      .required("An image file is required")
      .test("fileFormat", "Only PNG and JPEG files are accepted", (value) => {
        return value && ["image/png", "image/jpeg"].includes(value.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      token: "",
      description: "",
      website: "",
      royalties: "",
      mintspertrans: "",
      tokensupply: "",
      mintprice: "",
      walletmintlimit: "",
      // contentfolderCID: "",
      image: null,
      // metadatajson: "",
      // metadatafolderCID: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const addProjects = addProject;
        const NFT_STORAGE_TOKEN =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjMTVkRTM4NUU0Mzc1M0RBODNGZUE0NjgzZkZhMzc4RTFjZTUyZjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODk3NjUxMTc3NCwibmFtZSI6IkRvY1QifQ.t7bF1OuxuS6S9QMP_rfl72fYMneOa1jzs-mZhdjEhog";
        const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
        const imageFile = new File([values.image], values.image.name, {
          type: values.image.type,
        });

        // console.log(imageFile);

        const metadata = await client.store({
          name: values.name,
          description: values.description,
          website: values.website,
          tokensupply: values.tokensupply,
          token: values.token,
          image: imageFile,
        });
        console.log(metadata.url)

        
        if (window.ethereum) {
          try {
            // deploying
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(signer);
            //import nft from "./utils/MinHub.json";
            const minHubContract = new ethers.ContractFactory(
              nft.abi,
              nft.object,
              signer
            );
            // console.log("Created Contract");
            const minHub = await minHubContract.deploy(
              name,
              token,
              metadata.url,
              metadata.url
            );

            // console.log("Awaiting deploy");
            await minHub.deployed();
            // console.log("Deployed");
            // console.log(minHub.address);
            setNftAddress(minHub.address);
            await addProjects(
              metadata.data.name,
              metadata.data.token,
              1,
              minHub.address,
              metadata.data.image.href
            );
            // console.log("Added");
          } catch (err) {
            console.log(err);
          }
          setSubmitting(false);
        } else {
          window.alert("Please connect Metamask");
        }

        // console.log(metadata);
        await setStatus("Upload successful");
        setMetadata(metadata.ipnft);
        setName(metadata.data.name);
        setToken(metadata.data.token);
        // setViewProject(viewProject);
        setCurrentStep(6);
      } catch (error) {
        console.error(error);
        await setStatus("Upload failed");
      }
      setSubmitting(false);
    },
  });

  const handleChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue("token", value.toUpperCase());
  };
  // const handleChange = (event) => {
  //   const fileList = event.target.files;
  //   const images = [];
  //   for (let i = 0; i < fileList.length; i++) {
  //     images.push(fileList[i]);
  //   }
  //   setImages(images);
  //   formik.setFieldValue("images", images);
  // };

  return (
    <div className="bg-gray-900 h-screen w-screen">
      <div className="flex items-center text-center mr-14 justify-end ">
        {formik.status && (
          <>
            <p className="text-green-400 flex justify-center mr-28 text-xl">
              {formik.status}
            </p>
            {/* <p className="text-green-400 flex justify-center mr-28 absolute right-[330px] -bottom-32 text-xl">
              {formik.status}
            </p> */}
          </>
        )}
        <Link href="/" className="mr-3">
          <button className="shadow-md bg-gray-900 active:bg-white active:text-gray-800 hover:bg-slate-200 appearance-none border w-80 ml-9 mr-3 mt-4 rounded py-3 px-3 font-medium text-slate-50 leading-tight  hover:shadow-outline active:shadow-lg">
            Home
          </button>
        </Link>
      </div>

      <div className="pt-20 bg-gray-900 lg:h-[940px] w-screen md:h-[1440px]   pb-0 mb-0 flex">
        <div className=" bg-gray-900 h-[1040px]  lg:w-1/5 w-1/2">
          <div className=" flex px-16 mx-auto  text-center">
            {features.categories.map((category) => (
              <div
                key={category.name}
                className="font-bold   text-slate-100  text-xl"
              >
                {category.name}
              </div>
            ))}
          </div>
          <div>
            {features.categories.map((category) => (
              <div key={category.name} className="space-y-10 px-4 pt-10 pb-8 ">
                <ul
                  role="list"
                  className="mt-6 flex text-center flex-col w-44 space-y-6"
                >
                  <div className="space-y-3">
                    <li
                      className={`${
                        currentStep === 1
                          ? "active:bg-slate-400 bg-slate-400 text-slate-700 font-semibold border rounded-md active:border"
                          : ""
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(1)}
                    >
                      Information
                    </li>
                    <li
                      className={`${
                        currentStep === 2
                          ? "active:bg-slate-400 bg-slate-400 text-slate-700 font-semibold border rounded-md active:border"
                          : ""
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(2)}
                    >
                      Features
                    </li>
                    <li
                      className={`${
                        currentStep === 3
                          ? "active:bg-slate-400 bg-slate-400 text-slate-700 font-semibold border rounded-md active:border"
                          : ""
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(3)}
                    >
                      Upload Content
                    </li>
                    {/* <li
                      className={`${
                        currentStep === 4
                          ? "active:bg-slate-400 bg-slate-400 text-slate-700 font-semibold border rounded-md active:border"
                          : ""
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(4)}
                    >
                      Upload Metadata
                    </li> */}
                    <li
                      className={`${
                        currentStep === 4
                          ? "text-slate-300 text-xl font-semibold border rounded-md active:border"
                          : "text-slate-100 text-xl font-bold"
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(4)}
                    >
                      Deploy
                    </li>
                    <li>
                      <button
                        className={`${
                          currentStep === 5
                            ? " active:bg-slate-100 bg-slate-100 text-slate-700 font-bold border rounded-md active:border"
                            : "text-slate-400"
                        } cursor-pointer py-3 px-10 -m-2 ml-4 p-2 flex justify-center font-medium text-xl  text-slate-100`}
                        onClick={() => setCurrentStep(5)}
                        disabled
                      >
                        Testnet
                      </button>
                    </li>
                    <li
                      className={`${
                        currentStep === 6
                          ? " text-slate-300 text-xl font-semibold border rounded-md active:border"
                          : "text-slate-100 text-xl "
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(6)}
                    >
                      Dashboard
                    </li>
                    <li
                      className={`${
                        currentStep === 6
                          ? "active:bg-slate-100 bg-slate-100 text-slate-700 font-bold border rounded-md active:border"
                          : "text-slate-400"
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(6)}
                    >
                      Testnet confirm
                    </li>
                    {/* <li
                      className={`${
                        currentStep === 8
                          ? " text-slate-300 text-xl font-semibold border rounded-md active:border"
                          : "text-slate-100 text-xl "
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(8)}
                    >
                      Project
                    </li> */}
                    <li
                      className={`${
                        currentStep === 7
                          ? " text-slate-300 text-xl font-semibold border rounded-md active:border"
                          : "text-slate-100 text-xl "
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(7)}
                    >
                      Mint
                    </li>
                    <li
                      className={`${
                        currentStep === 7
                          ? "active:bg-slate-100 bg-slate-100 text-slate-700 font-bold border rounded-md active:border"
                          : "text-slate-400"
                      } cursor-pointer py-3 px-10 -m-2  p-2 flex justify-center font-medium  text-slate-100`}
                      onClick={() => setCurrentStep(7)}
                    >
                      Button Settings
                    </li>
                  </div>
                  {/* {category.items.map((item) => (
                  // <li
                  //   key={item.name}
                  //   className="active:bg-slate-400 active:border rounded-md py-3 px-10  "
                  //   onClick={() => setCurrentStep()}
                  // >
                  //   <a
                  //     href={item.href}
                  //     className="-m-2  p-2 flex justify-center  text-slate-500"
                  //   >
                  //     {item.name}
                  //   </a>
                  // </li>
                 
                ))} */}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <form
          className="bg-gray-900 lg:w-4/5 w-1/2 h-[1040px]   px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          {currentStep === 1 && (
            <Step1 formik={formik} handleChange={handleChange} />
          )}
          {currentStep === 2 && <Step2 formik={formik} />}
          {currentStep === 3 && <Step3 formik={formik} />}
          {/* {currentStep === 4 && <Step4 formik={formik} />} */}
          {currentStep === 4 && <Step4 formik={formik} />}
          {currentStep === 5 && (
            <Step5
              setCurrentStep={setCurrentStep}
              nftAddress={nftAddress}
              currentStep={currentStep}
              formik={formik}
            />
          )}
          {currentStep === 6 && (
            <Step6
              metadata={metadata}
              nftAddress={nftAddress}
              name={name}
              token={token}
              formik={formik}
              setCurrentStep={setCurrentStep}
            />
          )}
          {/* {currentStep === 8 && <Step8 />} */}
          {currentStep === 7 && <Step7 />}

          <div className="flex justify-between items-center  mt-14">
            {currentStep > 1 && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            {/* {currentStep == 5 && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onSubmit={handleSubmit}
            >
              Deploy
            </button>)} */}
            {currentStep < 4 && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
