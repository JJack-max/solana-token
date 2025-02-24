#!/bin/bash

# 检查第一个参数是否存在
if [ -z "$1" ]; then
  echo "请提供密钥文件路径作为第一个参数"
  exit 1
fi

KEYPAIR_FILE=$1

# 检查密钥文件是否存在
if [ ! -f "$KEYPAIR_FILE" ]; then
  echo "密钥文件 $KEYPAIR_FILE 不存在"
  exit 1
fi

# 获取钱包地址
WALLET_ADDRESS=$(solana-keygen pubkey "$KEYPAIR_FILE")

# 获取余额
BALANCE=$(solana balance "$WALLET_ADDRESS")

# 获取分配的数据大小
ALLOCATED_DATA_SIZE=$(solana account "$WALLET_ADDRESS" --output json | jq '.data.length')

# 获取分配的程序 ID
ASSIGNED_PROGRAM_ID=$(solana account "$WALLET_ADDRESS" --output json | jq -r '.owner')

# 获取交易历史
TRANSACTION_HISTORY=$(solana confirm --output json "$WALLET_ADDRESS" | jq '.')

# 输出结果
echo "钱包地址: $WALLET_ADDRESS"
echo "余额: $BALANCE"
echo "Allocated Data Size: $ALLOCATED_DATA_SIZE"
echo "Assigned Program Id: $ASSIGNED_PROGRAM_ID"
echo "Transaction History: $TRANSACTION_HISTORY"
