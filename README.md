# solana-token
mint token on solana


# solana-test-validator 添加metaplex程序
1.从devnet获取metaplex程序
solana program dump -u m metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s metadata.so
solana account -u m 4tSgNWeqtgp2kwRgjTqgpenP4wxfPaVCvganMR2gnd8W --output-file metadata.json --output json-compact
solana account -u m 7FTdQdMqkk5Xc2oFsYR88BuJt2yyCPReTpqr3viH6b6C --output-file nft.json --output json-compact

2.将metaplex程序加载到localnet
solana-test-validator -r --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s metadata.so --account 7FTdQdMqkk5Xc2oFsYR88BuJt2yyCPReTpqr3viH6b6C nft.json  --account 4tSgNWeqtgp2kwRgjTqgpenP4wxfPaVCvganMR2gnd8W metadata.json 


# 启动本地arweave，默认端口1984
# 参考 https://cookbook.arweave.dev/guides/testing/arlocal.html
npx arlocal