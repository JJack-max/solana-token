import { createInitializeMintInstruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { log } from "../common/my-log";
import { Connection, Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();

  let payer = getWallet("logs/payer-DhNniw9HjpYKbvNtTiyZ225CujNr4HpByn21SNysm7n7.json");
  let mintAuthority = getWallet("logs/mintAuthority-6VGigX1ScxmrMcQ1UjRZvboWZ81FRx6pV1a5WADTE4Ya.json");
  let freezeAuthority = getWallet("logs/freezeAuthority-BLv3MfnQCtqnzFT95WQE2GtQopjMF1Cgf6RgPtpXz42j.json");

  // create1(connection, payer, mintAuthority, freezeAuthority);
  create2(connection, payer, mintAuthority, freezeAuthority);


})();


async function create1(connection: Connection, payer: Keypair, mintAuthority: Keypair, freezeAuthority: Keypair) {

  let res = await createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    freezeAuthority.publicKey,
    8
  );

  log("token", res.toString());
}

async function create2(connection: Connection, payer: Keypair, mintAuthority: Keypair, freezeAuthority: Keypair) {

  const mint = Keypair.generate();

  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: await getMinimumBalanceForRentExemptMint(connection),
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint.publicKey,
      8,
      mintAuthority.publicKey,
      freezeAuthority.publicKey,
    ),
  );

  let signature = await sendAndConfirmTransaction(connection, tx, [payer, mint]);

  log("token", mint.publicKey.toString());

  console.log(signature);
}