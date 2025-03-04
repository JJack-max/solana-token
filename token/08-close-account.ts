import { closeAccount, createCloseAccountInstruction } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();
  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");
  let account = new PublicKey("5fSN7Wdz1CTdjFLxL1TdUHYD3TGCWdv95R5hFQhRwghB");
  let destination = payer.publicKey;
  let authority = getWallet("logs/source-FoMP4vbF6UMWpfHbHrc684hDALHjypNagVNfzbVFA9Ay.json");

  // close1(connection, payer, account, destination, authority);
  close2(connection, payer, account, destination, authority);

})();

async function close1(connection: Connection, payer: Keypair, account: PublicKey, destination: PublicKey, authority: Keypair) {
  let res = await closeAccount(
    connection,
    payer,
    account,
    destination,
    authority,
  );

  console.log(res);

}

async function close2(connection: Connection, payer: Keypair, account: PublicKey, destination: PublicKey, authority: Keypair) {
  let tx = new Transaction().add(
    createCloseAccountInstruction(
      account,
      destination,
      authority.publicKey,
    ),
  );

  let res = await sendAndConfirmTransaction(connection, tx, [payer, authority]);
  console.log(res);
}