import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import childTicket from "../utils/childTicket.json";
import { useRouter } from "next/router";

const EventDeets = () => {
  const router = useRouter();
  const eventAddress = router.query.address?.toString();
  const { address } = useAccount();

  const {
    data: evtAdmin,
    isLoading: evtAdminIsLoading,
    isError: evtAdminIsError,
  } = useContractRead({
    address: eventAddress,
    abi: childTicket,
    functionName: "eventAdmin",
  });

  useEffect(() => {
    if (evtAdmin) {
      console.log(`Event Admin is ${evtAdmin}`);
    }
  }, [evtAdmin]);

  const {
    data: evtName,
    isLoading: evtNameIsLoading,
    isError: evtNameIsError,
  } = useContractRead({
    address: eventAddress,
    abi: childTicket,
    functionName: "name",
  });

  useEffect(() => {
    if (evtName) {
      console.log(`Event Name is ${evtName}`);
    }
  }, [evtName]);

  const {
    data: regData,
    isLoading: regIsLoading,
    write: register,
  } = useContractWrite({
    address: eventAddress,
    abi: childTicket,
    functionName: "register",
  });

  const { data: regWaitData, isLoading: regIsLoadingWaitData } =
    useWaitForTransaction({
      hash: regData?.hash,

      onSuccess(data) {
        console.log(data);
        console.log("registration SUCCESSFUL");
        alert("SUCCESSFULLY REGISTERED");
        // register?.();
      },
      onError(error) {
        console.log(error);
        console.log("Could Not Register");
      },
    });

  useEffect(() => {
    if (regData) {
      console.log(regData);
      console.log("registering");
    }
  }, [regData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    register?.();
  };

  return (
    <div>
      <Navbar />
      <h1>Event Name are : {evtName}</h1>
      <h1>Event Admin address: {evtAdmin}</h1>

      <form onSubmit={handleSubmit}>
        <button
          className="bg-[green] border border-blue-300 text-black rounded-md p-2 hover:bg-light-blue hover:text-blue border-radius mb-5"
          type="submit"
        >
          {regIsLoading || regIsLoadingWaitData
            ? "Registering For Event..."
            : "Register For this Event"}
        </button>
      </form>
    </div>
  );
};

export default EventDeets;
