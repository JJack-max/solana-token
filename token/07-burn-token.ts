import { burnChecked, createBurnCheckedInstruction } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();
  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");
  let account = new PublicKey("5fSN7Wdz1CTdjFLxL1TdUHYD3TGCWdv95R5hFQhRwghB");
  let mint = new PublicKey("DBdTo5yAY6Rykd2TrP3rd8oKNYEAMSGM1boYnMrJapvP");
  let owner = getWallet("logs/source-FoMP4vbF6UMWpfHbHrc684hDALHjypNagVNfzbVFA9Ay.json");

  // burnChecked();
  // burn1(connection, payer, account, mint, owner);
  burn2(connection, payer, account, mint, owner);

})();

async function burn1(connection: Connection, payer: Keypair, account: PublicKey, mint: PublicKey, owner: Keypair) {
  let res = await burnChecked(
    connection,
    payer,
    account,
    mint,
    owner,
    99 * 1e8,
    8,
  );

  console.log(res);

}

async function burn2(connection: Connection, payer: Keypair, account: PublicKey, mint: PublicKey, owner: Keypair) {
  let tx = new Transaction().add(
    createBurnCheckedInstruction(
      account,
      mint,
      owner.publicKey,
      100 * 1e8,
      8,
    ),
  );

  let res = await sendAndConfirmTransaction(connection, tx, [payer, owner]);
  console.log(res);
}