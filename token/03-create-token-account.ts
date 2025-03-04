import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { log } from "../common/my-log";

(async () => {

  let connection = getConnection();

  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");

  let owner = getWallet("logs/destination-7dCZM7m4XSmJQP1RVuHmj9EBieufMheMdUBF5vKDDyz8.json");

  let tokenPublickey = new PublicKey("DBdTo5yAY6Rykd2TrP3rd8oKNYEAMSGM1boYnMrJapvP");

  // createTokenAccount1(connection, payer, owner.publicKey, tokenPublickey);
  createTokenAccount2(connection, payer, owner.publicKey, tokenPublickey);

})();

async function createTokenAccount1(connection: Connection, payer: Keypair, owner: PublicKey, tokenPublickey: PublicKey) {

  let res = await createAssociatedTokenAccount(
    connection,
    payer,
    tokenPublickey,
    owner,
  );

  log("token-account", [owner, res, tokenPublickey.toString()]);

  console.log(res);
}

async function createTokenAccount2(connection: Connection, payer: Keypair, owner: PublicKey, tokenPublickey: PublicKey) {

  let ata = await getAssociatedTokenAddress(
    tokenPublickey,
    owner,
  );

  let tx = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      payer.publicKey,
      ata,
      owner,
      tokenPublickey,
    )
  );

  let signature = await sendAndConfirmTransaction(connection, tx, [payer]);

  log("token-account", [owner.toString(), ata.toString(), tokenPublickey.toString()]);


  console.log(signature);
}