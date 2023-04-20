import React from "react";
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
import childTicket from "../utils/iticketAbi.json";

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
    args: [id, fee, numberOfPart, eventUri, startTime, endTime, name, symbol],
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

  const {
    data: ReturntotalnumberofEvent,
    isLoading: numberOfEventIsLoading,
    isError: numberIsError,
  } = useContractRead({
    address: "0x8197Ac59CbC142236bdAb2C91d420A528c592750",
    abi: ticketAbi,
    functionName: "returnTotalNoOfEvents",
  });

  useEffect(() => {
    const evt = toString(ReturntotalnumberofEvent);
    if (evt) {
      console.log(evt);
    }
  }, [ReturntotalnumberofEvent]);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    create?.();
  };

  //===================================================
  //==================================================
  //===================================================

  return (
    <div>
      <h1 className="font-bold font-weight:900 text-center my-3 justify-center ">
        Total Number Of Events created: {String(totalNoOfEvents)}
      </h1>

      <div class="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit2}>
          <label>Username</label>
          <input
            type="text"
            name="u"
            placeholder="Username"
            required="required"
          />
          <input
            type="password"
            name="p"
            placeholder="Password"
            required="required"
          />
          <button type="submit" class="btn btn-primary btn-block btn-large">
            Let me in.
          </button>
        </form>
      </div>
    </div>
  );
}
