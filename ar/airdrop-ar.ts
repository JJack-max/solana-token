import { readFileSync } from "fs";
import { getArweave } from "../common/arweave";

(async () => {
    let arweave = getArweave();

    let walletStr: string = "logs/ar-Jack-4Sj84EvOlo317Sk0YjlR7uI3IJ_R7uwcjsvHPiJSwN4.log";

    const wallet = JSON.parse(readFileSync(walletStr, "utf-8"))
    // const wallet = await arweave.wallets.generate();
    const addr = await arweave.wallets.getAddress(wallet);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
})();