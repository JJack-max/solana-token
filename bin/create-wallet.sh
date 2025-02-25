#!/bin/bash

# 检查第一个参数是否存在
if
  [ -z "$1" ]
then
  echo "请提供钱包名字作为第一个参数"
  exit 1
fi

WALLET_NAME=$1
AIRDROP_AMOUNT=$2

# 创建钱包
solana-keygen new --no-passphrase --outfile "/root/solana-token/logs/${WALLET_NAME}-publickey.json"

# 获取公钥
PUBLIC_KEY=$(solana-keygen pubkey "/root/solana-token/logs/${WALLET_NAME}-publickey.json")

echo "钱包创建成功，公钥为: $PUBLIC_KEY"

mv "/root/solana-token/logs/${WALLET_NAME}-publickey.json" "/root/solana-token/logs/${WALLET_NAME}-${PUBLIC_KEY}.json"

# 如果提供了空投金额，则进行空投
if
  [ ! -z "$AIRDROP_AMOUNT" ]
then
  echo "正在为钱包 $PUBLIC_KEY 进行空投 $AIRDROP_AMOUNT SOL..."
  solana airdrop ${AIRDROP_AMOUNT} ${PUBLIC_KEY}
  echo "空投成功。"
fi

echo "密钥文件保存在: ${WALLET_NAME}-${PUBLIC_KEY}.json"
