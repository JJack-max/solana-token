import { getArweave, getWallet, upload } from "../common/arweave";

(async () => {

    let wallet = getWallet("logs/ar-Jack-oR7i1OKhNn2M6Y_Y9XAXtIa0rhi-zidSZtadMY2IH-A.log");

    const arweave = getArweave();

    upload(arweave, wallet, "logs/2023fb596c5bc7f7f2602e7f899811c8.jpg");

})();