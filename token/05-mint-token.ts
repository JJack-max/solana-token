import { createMintToCheckedInstruction, mintToChecked } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();
  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");
  let mintAuthority = getWallet("logs/mintAuthority-GsVLE3jmhufL9zBCE1Td8sS4RnBKnd5LA8nSqG6sGw7F.json");
  let tokenPublicKey = new PublicKey("DBdTo5yAY6Rykd2TrP3rd8oKNYEAMSGM1boYnMrJapvP");
  let tokenAccount = new PublicKey("5fSN7Wdz1CTdjFLxL1TdUHYD3TGCWdv95R5hFQhRwghB");

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
      1000 * 1e8,
      8,
    )
  );

  let signature = await sendAndConfirmTransaction(connection, tx, [payer, mintAuthority]);

  console.log(signature);
}