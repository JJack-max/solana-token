import { createSyncNativeInstruction, getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { clusterApiUrl, Connection, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

(async () => {

  // let connection = getConnection();

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");

  let owner = getWallet("logs/owner-5xwj82iQig19oU4uPVeerJZRBgRjSFUdd9oG36weDCrv.json");

  let ata = await getAssociatedTokenAddress(NATIVE_MINT, owner.publicKey);

  let amount = 1 * 1e9;

  let tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: owner.publicKey,
      toPubkey: ata,
      lamports: amount,
    }),
    createSyncNativeInstruction(ata),
  );

  let res = await sendAndConfirmTransaction(connection, tx, [payer, owner]);
  console.log(res);
})();