import { createInitializeMintInstruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { log } from "../common/my-log";
import { Connection, Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();

  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");
  let mintAuthority = getWallet("logs/mintAuthority-GsVLE3jmhufL9zBCE1Td8sS4RnBKnd5LA8nSqG6sGw7F.json");
  let freezeAuthority = getWallet("logs/freezeAuthority-DnetBkDnhS5YsCnbXamVdpn5pNvqD4N4RMzYe8A4qrTK.json");

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