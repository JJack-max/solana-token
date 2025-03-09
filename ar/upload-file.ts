import { getArweave, getWallet, upload } from "../common/arweave";

(async () => {

    let wallet = getWallet("logs/ar-Jack-4Sj84EvOlo317Sk0YjlR7uI3IJ_R7uwcjsvHPiJSwN4.log");

    const arweave = getArweave();

    upload(arweave, wallet, "logs/aaaaaa.png");

})();