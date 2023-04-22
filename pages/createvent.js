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
        evSuccessCreated();
      },

      onError(error) {
        console.log("Encountered error: ", error);
      },
    });

  useEffect(() => {
    if (createEventData) {
      onClick();
      console.log(createEventData);
    }
  }, [createEventData]);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    create?.();
  };

  const notify = () => toast("Wow so easy !");

  const evSuccessCreated = () =>
    toast("Successfully Created Event", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "Success",
      position: "bottom-right",
    });

  //===================================================
  //==================================================
  //===================================================

  return (
    <div className="bck">
      <Navbar />

      <div>
        <div className="flex  items-center justify-center ">
          <h1 className="createEvt">Create Event</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit2} className="form-container">
              <label className="text-lg ">
                Registration Id: <br />
              </label>
              <input
                className="form-input"
                type="number"
                placeholder="Enter event Id"
                onChange={(e) => setid(e.target.value)}
              />

              <br />
              <label>Event Fee:</label>
              <br />
              <input
                className="form-input"
                type="number"
                placeholder="Enter zero if event is free"
                onChange={(e) => setEventFee(e.target.value)}
              />

              <br />
              <br />
              <label>
                Number of Participant:
                <br />
                <input
                  className="form-input"
                  type="number"
                  placeholder="No of participants"
                  onChange={(e) => setNoOfParticipants(e.target.value)}
                />
              </label>

              <br />

              <br />
              <label>
                StartTime:
                <br />
                <input
                  className="form-input"
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
                EndTime:
                <br />
                <input
                  className="form-input"
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
                  className="form-input"
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
                  className="form-input"
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
                  className="form-input"
                  type="text"
                  placeholder="Event NFt sympol"
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </label>
              <br />

              <button onClick={notify} className="button" type="submit">
                {createEventIsLoading || createWaitIsLoading
                  ? "Creating event..."
                  : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
