import { Connection, Keypair } from "@solana/web3.js"
import { readFileSync } from "fs";

const getConnection = (url?: string): Connection => {
  if (!url) {
    url = "http://127.0.0.1:8899";
  }
  return new Connection(url);
};


const getWallet = (file?: string): Keypair => {

  if (!file) {
    file = "/root/.config/solana/id.json";
  }

  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(file, { encoding: "utf-8" }))));
};

export { getConnection, getWallet }