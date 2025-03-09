import Arweave from "arweave";

const getArweave = (): Arweave => {
    return Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    });
};

export { getArweave }