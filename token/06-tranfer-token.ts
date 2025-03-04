import { createTransferCheckedInstruction, transferChecked } from "@solana/spl-token";
import { getConnection, getWallet } from "../common/wallet";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

(async () => {

  let connection = getConnection();
  let payer = getWallet("logs/payer-HJLTj59bampq4nYPT52KqWP4HLsjJuQ8hfbXUMy7kGTi.json");

  let source = new PublicKey("5fSN7Wdz1CTdjFLxL1TdUHYD3TGCWdv95R5hFQhRwghB"); // 1000 -> 899.999999 -> 799.99999

  let mint = new PublicKey("DBdTo5yAY6Rykd2TrP3rd8oKNYEAMSGM1boYnMrJapvP");

  let destination = new PublicKey("3NCdMi6eT6VcP9ELCabSFTAb1f5QSKD9MivsSopKHzCJ"); // 0 -> 100.000001 => 200.000001

  let owner = getWallet("logs/source-FoMP4vbF6UMWpfHbHrc684hDALHjypNagVNfzbVFA9Ay.json");


  // tranfer1(connection, payer, source, mint, destination, owner);
  tranfer2(connection, payer, source, mint, destination, owner);

})();

async function tranfer1(connection: Connection, payer: Keypair, source: PublicKey, mint: PublicKey, destination: PublicKey, owner: Keypair) {
  let res = await transferChecked(
    connection,
    payer,
    source,
    mint,
    destination,
    owner,
    100 * 1e8,
    8,
  );

  console.log(res);
}

async function tranfer2(connection: Connection, payer: Keypair, source: PublicKey, mint: PublicKey, destination: PublicKey, owner: Keypair) {
  let tx = new Transaction().add(
    createTransferCheckedInstruction(
      source,
      mint,
      destination,
      owner.publicKey,
      100 * 1e8,
      8,
    ),
  );

  let res = await sendAndConfirmTransaction(connection, tx, [payer, owner]);
  console.log(res);
}