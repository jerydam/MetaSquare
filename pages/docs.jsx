/* eslint-disable */
import React from 'react';
import { Footer, Navbar } from '../components';

export default function Documentation() {


    <div className="bck">
        <Navbar />
        
        <div className="m-[80px] ypaddings bg-white">
        <h1 className="text-5xl font-bold text-center">How to Create an Event</h1>
    </div>

        <div className="bg-white">
            <ol>
                <li><span className="text-xl font-semibold ml-5 mb-4">Register the event</span> <br/>
                    All events hosted on the platform are vetted and approved before they are created. This is to
                    maintain oversight, and not run into situations where inappropriate events are hosted on the platform.
                    To register an event, simply click on the "Register event" button on the homepage and fill in the short form, the 
                    wallet address of the event organizer is required.
                </li>

                <li><span className="text-xl m-11 font-semibold">Create the Event</span> <br />
                    After an event is registered, an ID is generated for the event. This ID is required to create an event
                    to enable us track the event efficiently. The person that is authorized to register the event will be ONLY 
                    the wallet address passed in during the event registration. 

                    An event NFT, which serves as the ticket to the event, is created together with the event, hence the event organizer
                    will need to set the NFT name, symbol and Uri. Uri are a unique sequence of alphanumeric strings that connects a token to its metadata
                    onchain. If you need assistance to create the Uri, kindly contact us: hello@metasquare.io
                    Once the event is successfully created, the page will automatically redirect to the event page.
                </li>

                <li> <span className="text-xl font-semibold">Set attendees</span> <br />
                    Audience that attended events created on our platform are rewarded with a proof of attendance NFT. This NFT is automatically 
                    minted to every user whose address appears in the database as submitted by the event organizers. It is basic psychology that everyone loves to be 
                    appreciated, also as more individuals are embracing the modern web3 trend, issuing of paper certificates
                    to people is becoming redundant, it is easier and more earth-friendly to mint these certificates as tokens. This in turn deepens the connection between the 
                    audience and the brand. 
                    To achieve this, event organizers are required to pass to the platform the addresses of the users that attended the event. The button to set attendees is 
                    available in the admin dashboard.
                </li>

                <li><span className="text-xl font-semibold">Register for event</span> <br />
                        To register for an event, simply click on the preferred event, the click on the register button. You need to ensure that
                        IF there"s a fee for the event, the amount of money you enter is equal to the fee. If the event is free, simply enetr zero as the fee and continue.
                </li>

                <li><span className="text-xl font-semibold">Claim Certificate of attendance</span> <br />
                    Users whose wallet addresses are passed in by the event organizers can mint proof of attendance certificates after the event has ended.
                    This operation is free, and onlt costs a fraction of gas fee to write to blockchain. 
                    The button to claim the certificate is in the user dashboard.
                </li>
            </ol>

                Need assistance? contact us here: hello@metasquare.io  
        </div>

        <Footer />
        
    </div>
  }