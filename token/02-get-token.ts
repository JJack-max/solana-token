import { getMint } from "@solana/spl-token";
import { getConnection } from "../common/wallet";
import { PublicKey } from "@solana/web3.js";

(async () => {
  let connection = getConnection();
  let address = new PublicKey("9rXedtDrnUFnJZDQZDrP3DrTBU72T7Fpk5twu44yuepb");
  let res = await getMint(connection, address);

  console.log(res);
})();