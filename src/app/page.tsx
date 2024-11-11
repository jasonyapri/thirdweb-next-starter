"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { useState } from "react";

export default function Home() {
  const [shares, setShares] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [shareAmount, setShareAmount] = useState("");

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 w-full">
        <Header />

        <div className="flex justify-center mb-10">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <p>Property Address: {/* Add property address here */}</p>
            <p>Total Shares: {/* Add total shares here */}</p>
            <p>Your Shares: {/* Add user shares here */}</p>
            <p>Contract Owner: {/* Add owner address here */}</p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Buy Shares</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                placeholder="Amount in ETH"
                className="w-full p-2 bg-zinc-700 rounded"
              />
              <button
                onClick={() => {/* Add buy shares logic here */}}
                className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
              >
                Buy Shares
              </button>
            </div>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Transfer Shares</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                placeholder="Recipient Address"
                className="w-full p-2 bg-zinc-700 rounded"
              />
              <input
                type="text"
                value={shareAmount}
                onChange={(e) => setShareAmount(e.target.value)}
                placeholder="Number of Shares"
                className="w-full p-2 bg-zinc-700 rounded"
              />
              <button
                onClick={() => {/* Add transfer shares logic here */}}
                className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
              >
                Transfer Shares
              </button>
            </div>
          </div>

          {/* Only show this section if user is owner */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Owner Actions</h2>
            <button
              onClick={() => {/* Add withdraw logic here */}}
              className="w-full bg-green-500 hover:bg-green-600 p-2 rounded"
            >
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Tokenized Property
      </h1>

      <p className="text-zinc-300 text-base">
        Buy and manage property shares using blockchain technology
      </p>
    </header>
  );
}