import Link from "next/link";
import { useContractRead } from "wagmi";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import factoryAbi from "../utils/factoryAbi.json";
import childTicket from "../utils/childTicket.json";
import { Footer, Navbar } from "../components";

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
    <div className="mt-10 <div bck">
      <Navbar />
      {eventLoading || eventDetailsLoading ? (
        <div className="loading-message">The Page Is Loading ....</div>
      ) : (
        <>
          <div className="list-of-events">List Of Events In MetaSquare</div>
          <div className="events-container">
            {eventDetails.map((event, _i) => {
              return (
                <Link
                  href={`/eventDeets?address=${event.address}`}
                  key={_i}
                  className="event-card"
                >
                  <div className="event-name">
                    <div className="flex">
                      Event Name: <span>{event.eventName}</span>
                    </div>

                    <div className="event-address">
                      Address: {""}
                      <span className="text-sm text-gray-500 !important">
                        {`${event.address.slice(0, 6)}...${event.address.slice(
                          -4
                        )}`}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default events;
