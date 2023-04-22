import React from "react";
import { Footer, Navbar } from "../components";
import styles from "../styles";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import factoryAbi from "../utils/factoryAbi.json";

export default function Event() {
  const factoryContract = "0x19AF8cb9603ab82f146164b6b0a7a30885fF27c8";
  

  //**==========Defining States================== */
  const [id, setid] = useState(null);
  const [eventFee, setEventFee] = useState(null);
  const [noOfParticipants, setNoOfParticipants] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventUri, setEventUri] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const { config: config1 } = usePrepareContractWrite({
    address: factoryContract,
    abi: factoryAbi,
    functionName: "createEvent",
    args: [
      id,
      eventFee,
      noOfParticipants,
      startTime,
      endTime,
      eventUri,
      name,
      symbol,
    ],
  });

  const {
    data: createEventData,
    isLoading: createEventIsLoading,
    write: create,
  } = useContractWrite(config1);

  const { data: createWaitData, isLoading: createWaitIsLoading } =
    useWaitForTransaction({
      data: createEventData?.hash,

      onSuccess(data) {
        console.log("SUCCESSFULLY REGISTERED: ", data);
      },

      onError(error) {
        console.log("Encountered error: ", error);
      },
    });

  useEffect(() => {
    if (createEventData) {
      console.log(createEventData);
    }
  }, [createEventData]);

  // const {
  //   data: ReturntotalnumberofEvent,
  //   isLoading: numberOfEventIsLoading,
  //   isError: numberIsError,
  // } = useContractRead({
  //   address: "0x8197Ac59CbC142236bdAb2C91d420A528c592750",
  //   abi: ticketAbi,
  //   functionName: "returnTotalNoOfEvents",
  // });

  // useEffect(() => {
  //   const evt = toString(ReturntotalnumberofEvent);
  //   if (evt) {
  //     console.log(evt);
  //   }
  // }, [ReturntotalnumberofEvent]);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    create?.();
  };

  //===================================================
  //==================================================
  //===================================================

  return (
    <div className="bg2">
      <Navbar />

      <div>
        {/* <h1 className="font-bold font-weight:900 text-center my-3 justify-center ">
        Total Number Of Events created: {String(totalNoOfEvents)}
      </h1> */}
        <div className="flex ml-12 create2">
          <h1 className="text-xl ">Create Event</h1>
        </div>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit2}>
            <label className="text-lg ">
              Registration Id: <br />
            </label>
              <input
                className="p-2 border border-teal-800 py-3 rounded-md bg-slate-600"
                type="number"
                placeholder="Enter event Id"
                onChange={(e) => setid(e.target.value)}
              />

            <br />
            <label>
              Event Fee:
            </label>
              <br />
              <input
                className="p-2 border border-orange-400"
                type="number"
                placeholder="Enter zero if event is free"
                onChange={(e) => setEventFee((e.target.value * 1e18).toString())}
              />

            <br />
            <br />
            <label>
              Number of Participant:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="number"
                placeholder="No of participants"
                onChange={(e) => setNoOfParticipants(e.target.value)}
              />
            </label>

            <br />

            <br />
            <label>
              Registration start date:
              <br />

              <input
                className="p-2 border border-orange-400"
                type="datetime-local"
                placeholder="Enter registration start time"
                onChange={(e) => {
                  const timeString = e.target.value;
                  const date = new Date(timeString);
                  const unixTimestamp = (date.getTime() / 1000).toString();
                  setEndTime(unixTimestamp);
                  console.log(unixTimestamp);
                }}
              />

            </label>

            <br />
            <label>
              Registration deadline:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="datetime-local"
                placeholder="Enter registration deadline"
                onChange={(e) => {
                  const timeString = e.target.value;
                  const date = new Date(timeString);
                  const unixTimestamp = (date.getTime() / 1000).toString();
                  setEndTime(unixTimestamp);
                  console.log(unixTimestamp);
                }}
              />
            </label>

            <br />
            <label>
              Event Uri:
              <br />
              <input
                className="p-1 border border-orange-700"
                type="text"
                placeholder="event NFT uri"
                id="uri"
                onChange={(e) => setEventUri(e.target.value)}
              />
            </label>
            <br />
            <br />

            <label>
              NFT Name:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="text"
                placeholder="Event NFT name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              NFt Symbol:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="text"
                placeholder="Event NFt sympol"
                onChange={(e) => setSymbol(e.target.value)}
              />
            </label>
            <br />

            <button
              className="bg-[green] btn border border-blue-300 text-black rounded-md p-12 hover:bg-light-blue hover:text-blue border-radius mb-5"
              type="submit"
            >
              {createEventIsLoading || createWaitIsLoading
                ? "Creating event..."
                : "Create Event"}
            </button>
          </form> 
        </div>
      </div>

      <Footer />
    </div>
  );
}
