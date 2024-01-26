// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createPublicClient, getContract, http } from "viem";

import React from "react";
import { abi } from "~/lib/erc1155-abi.json";
import { mainnet } from "viem/chains";

const tokenIds = ["730724", "730478"];

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const validateNFTOwnership = async (userAddress: string) => {
  try {
    const contractAddress = "0xd07dc4262bcdbf85190c01c996b4c06a461d2430";
    //   const userAddress1 = "730724";
    //   const userAddress2 = "730478";
    //   const provider = new ethers.providers.JsonRpcProvider(
    //     process.env.ALCHEMY_ENDPOINT,
    //   );
    // Specify the Contract type for the contract variable
    const contract = getContract({
      address: contractAddress,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      abi,
      publicClient,
    });

    const balances = await Promise.all(
      tokenIds.map(async (tokenId) => {
        const balance = await contract.read.balanceOf([userAddress, tokenId]);
        return { tokenId, balance };
      }),
    );
    console.log("balances", balances);

    //   const contract: Contract = new ethers.Contract(
    //     contractAddress,
    //     abi,
    //     provider,
    //   );
    //   const balance = await contract.balanceOf(address, userAddress1);
    //   console.log("balance", balance);

    // If no balance of either token, set unauthorized
    const hasBalanceGreaterThanOne = balances.some(
      (balances) => balances.balance > 1,
    );

    if (hasBalanceGreaterThanOne) {
      return true;
    } else {
      return false;
    }

    console.log(hasBalanceGreaterThanOne); // Will be true if any balance is greater than 1, otherwise false

    return false;
  } catch (error) {
    console.log(error);
    return null;
  }
};

function Web3GatedPage() {
  const authorized = validateNFTOwnership(
    "0xB562D33bbD8cc08D392ce0731DCe88336E1703F8",
  ).then((value) => {
    console.log("web3-authorized", value);
  });
  return <div>Web3GatedPage</div>;
}

export default Web3GatedPage;
