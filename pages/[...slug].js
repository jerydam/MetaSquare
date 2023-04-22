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
    }
  }, [regData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    register?.();
  };

  const {
    data: claimData,
    isLoading: claimIsLoading,
    write: claimPOAP,
  } = useContractWrite({
    address: eventAddress,
    abi: childTicket,
    functionName: "claimAttendanceToken",
  });

  const { data: claimWaitData, isLoading: claimIsLoadingWaitData } =
    useWaitForTransaction({
      hash: claimData?.hash,

      onSuccess(data) {
        console.log(data);
        console.log("Claim Successful");
        alert("SUCCESSFULLY Claimed POAP");
        // register?.();
      },
      onError(error) {
        console.log(error);
        console.log("Could Not Register");
        alert("It seems you didn't attend this event");
      },
    });

  useEffect(() => {
    if (claimData) {
      console.log(claimData);
    }
  }, [claimData]);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    claimPOAP?.();
  };

  return (
    <div>
      <Navbar />
      <div className="evt-card">
        <h1 className="title">Event Name : {evtName}</h1>
        <h1 className="address">Event Admin address: {evtAdmin}</h1>

        <form onSubmit={handleSubmit}>
          <button className="register-button" type="submit">
            {regIsLoading || regIsLoadingWaitData
              ? "Registering For Event..."
              : "Register"}
          </button>
        </form>

        <hr></hr>

        <form onSubmit={handleSubmit2}>
          <button className="register-button" type="submit">
            {claimIsLoading || claimIsLoadingWaitData
              ? "Claiming POAP..."
              : "Claim POAP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventDeets;
