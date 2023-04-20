import Link from "next/link";
import { useContractRead } from "wagmi";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import factoryAbi from "../utils/factoryAbi.json";
import childTicket from "../utils/childTicket.json";
// import Navbar from "../components/Navbar";
// import { Footer } from "../components";

const events = () => {
  const [eventDetailsLoading, setEventDetailsLoading] = useState(false);
  const CONTRACT = "0x5A7Ee10F0b543BB6577f7255B15A8319E0a41F97";

  const { data: events, isLoading: eventLoading } = useContractRead({
    address: CONTRACT,
    abi: factoryAbi,
    functionName: "showTotalEventAddresses",
  });

  const [eventDetails, setEventDetails] = useState([]);

  const fetchEventDetails = async () => {
    const { ethereum } = window;
    setEventDetailsLoading(true);

    try {
      if (ethereum) {
        const eventDetailsArray = [];
        for (let i = 0; i < events.length; i++) {
          let address = events[i];

          const provider = new ethers.providers.JsonRpcProvider(
            "https://polygon-mumbai.g.alchemy.com/v2/OnD5ir1kRjdZ2sZZAtBOK_-u6DF1Q2nd"
          );

          const eventContract = new ethers.Contract(
            address,
            childTicket,
            provider
          );

          const eventName = await eventContract.name();

          eventDetailsArray.push({ eventName, address });
        }

        setEventDetails(eventDetailsArray);
        setEventDetailsLoading(false);
      }
    } catch (error) {
      console.log(error);
      console.log("Error here oooh");
      setEventDetailsLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetching...");
    if (events?.length > 0) {
      fetchEventDetails();
    }
  }, [events]);

  return (
    <div className="mt-10">
      {eventLoading || eventDetailsLoading ? (
        <div>The Page Is Loading ....</div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {eventDetails.map((event, _i) => {
            return (
              <Link
                href={`${event.address}`}
                key={_i}
                className="col-span-1 border border-teal-400 rounded-xl p-4 mb-4 cursor-pointer"
              >
                <div className="flex">
                  Event Name: <span>{event.eventName}</span>
                </div>

                <div className="flex">
                  Address: {""}
                  <span className="">
                    {`${event.address.slice(0, 6)}...${event.address.slice(
                      -4
                    )}`}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default events;
