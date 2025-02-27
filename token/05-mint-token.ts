import { createMintToCheckedInstruction, mintToChecked } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();
  let payer = getWallet("logs/payer-DhNniw9HjpYKbvNtTiyZ225CujNr4HpByn21SNysm7n7.json");
  let mintAuthority = getWallet("logs/mintAuthority-6VGigX1ScxmrMcQ1UjRZvboWZ81FRx6pV1a5WADTE4Ya.json");
  let tokenPublicKey = new PublicKey("9rXedtDrnUFnJZDQZDrP3DrTBU72T7Fpk5twu44yuepb");
  let tokenAccount = new PublicKey("G7cDr3tK4GpMUREQpvneQPfuANg7HQEoY4cEvjGbxMqW");

  // mint1(connection, payer, tokenPublicKey, tokenAccount, mintAuthority);
  mint2(connection, payer, tokenPublicKey, tokenAccount, mintAuthority);

})();

async function mint1(connection: Connection, payer: Keypair, tokenPublicKey: PublicKey, tokenAccount: PublicKey, mintAuthority: Keypair) {
  let signature = await mintToChecked(
    connection,
    payer,
    tokenPublicKey,
    tokenAccount,
    mintAuthority,
    1000 * 1e8,
    8,
  );
  console.log(signature);
}

async function mint2(connection: Connection, payer: Keypair, tokenPublicKey: PublicKey, tokenAccount: PublicKey, mintAuthority: Keypair) {
  let tx = new Transaction().add(
    createMintToCheckedInstruction(
      tokenPublicKey,
      tokenAccount,
      mintAuthority.publicKey,
      500 * 1e8,
      8,
    )
  );

  let signature = await sendAndConfirmTransaction(connection, tx, [payer, mintAuthority]);

  console.log(signature);
}