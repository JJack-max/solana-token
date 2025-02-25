import winston from 'winston';
import path from 'path';
import fs from 'fs';

// 创建一个日志记录器映射，用于存储不同文件名的记录器实例
const loggers: { [fileName: string]: winston.Logger } = {};

// 获取或创建日志记录器的函数
const getLogger = (fileName: string): winston.Logger => {
  // 如果记录器已经存在，则返回它
  if (loggers[fileName]) {
    return loggers[fileName];
  }

  // 构建日志文件路径 (使用绝对路径)
  const logDirectory = '/root/solana-token/logs'; // 替换为你的实际路径
  const logFilePath = path.join(logDirectory, `${fileName}.log`);

  // 确保日志目录存在
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true }); // 递归创建目录
  }

  // 创建一个新的日志记录器
  const logger = winston.createLogger({
    level: 'info', // 默认日志级别
    format: winston.format.combine(
      winston.format.printf(({ message }) => {
        return `${message}`;
      })
    ),
    transports: [
      new winston.transports.File({ filename: logFilePath }) // 将日志写入文件
    ],
  });

  // 如果不是生产环境，则同时输出到控制台
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  // 将记录器存储在映射中
  loggers[fileName] = logger;
  return logger;
};

// 封装日志函数
const log = (fileName: string, content: any): void => {
  const logger = getLogger(fileName);

  // 如果内容是对象，则使用 info 方法记录对象
  if (typeof content === 'object') {
    logger.info(JSON.stringify(content, null, 2)); // 使用 JSON.stringify 格式化对象
  } else {
    // 否则，将内容转换为字符串并记录
    logger.info(String(content));
  }
};

export { log }
