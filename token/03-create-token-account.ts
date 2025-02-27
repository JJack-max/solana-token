import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { log } from "../common/my-log";

(async () => {

  let connection = getConnection();

  let payer = getWallet("logs/payer-DhNniw9HjpYKbvNtTiyZ225CujNr4HpByn21SNysm7n7.json");

  let owner = getWallet("logs/owner-J268JHvKUbRduunsW9RY6fHPDcoAAzyZedfc2Ggc3ZN2.json");

  let tokenPublickey = new PublicKey("9rXedtDrnUFnJZDQZDrP3DrTBU72T7Fpk5twu44yuepb");

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