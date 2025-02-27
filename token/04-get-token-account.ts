import { getAccount } from "@solana/spl-token"
import { getConnection } from "../common/wallet"
import { PublicKey } from "@solana/web3.js";

(async () => {


  let connection = getConnection();

  let tokenAccount = new PublicKey("8445SxGwp3X4uDH3p2m8PmdU3S8GRQDEQz6JmvqW9f9H");

  let res = await getAccount(connection, tokenAccount);

  console.log(res);

})();