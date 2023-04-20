import React from "react";
import { Footer, Navbar } from "../components";
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
  const factoryContract = "0x5A7Ee10F0b543BB6577f7255B15A8319E0a41F97";

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
    <div>
      <Navbar />

      <div>
        {/* <h1 className="font-bold font-weight:900 text-center my-3 justify-center ">
        Total Number Of Events created: {String(totalNoOfEvents)}
      </h1> */}

        <div className="bg-[grey]">
          <h1>Login</h1>
          <form onSubmit={handleSubmit2}>
            <label>
              Registeration Id: <br />
              <input
                className="p-2 border border-orange-400"
                type="number"
                placeholder="Id"
                onChange={(e) => setid(e.target.value)}
              />
            </label>

            <br />
            <label>
              Event Fee:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="number"
                placeholder="Price"
                onChange={(e) => setEventFee(e.target.value)}
              />
            </label>

            <br />
            <br />
            <label>
              Number of Participant:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="number"
                placeholder="N0 of participant"
                onChange={(e) => setNoOfParticipants(e.target.value)}
              />
            </label>

            <br />

            <br />
            <label>
              StartTime:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="time"
                placeholder="Enter time the event commences (HH:mm:ss)"
                onChange={(e) => {
                  const timeString = e.target.value;
                  const date = new Date(`1970-01-01T${timeString}:00Z`);
                  const unixTimestamp = Math.floor(date.getTime() / 1000);
                  console.log(unixTimestamp);
                  setStartTime(unixTimestamp);
                }}
              />
            </label>

            <br />
            <label>
              EnTime:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="time"
                placeholder="Enter time the event commences (HH:mm:ss)"
                onChange={(e) => {
                  const timeString = e.target.value;
                  const date = new Date(`1970-01-01T${timeString}:00Z`);
                  const unixTimestamp = Math.floor(date.getTime() / 1000);
                  console.log(unixTimestamp);
                  setEndTime(unixTimestamp);
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
                placeholder="event uri"
                onChange={(e) => setEventUri(e.target.value)}
              />
            </label>
            <br />
            <br />

            <label>
              Event Name:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              symbol:
              <br />
              <input
                className="p-2 border border-orange-400"
                type="text"
                placeholder="sympol"
                onChange={(e) => setSymbol(e.target.value)}
              />
            </label>
            <br />

            <button
              className="bg-[green] border border-blue-300 text-black rounded-md p-2 hover:bg-light-blue hover:text-blue border-radius mb-5"
              type="submit"
            >
              {createEventIsLoading || createWaitIsLoading
                ? "Creating event..."
                : "Create Event"}
            </button>
          </form>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
