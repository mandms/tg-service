export const AirgramConfig = {
  command: process.env.TDLIB_COMMAND,
  apiId: Number(process.env.APP_ID) as number | undefined,
  apiHash: process.env.APP_HASH,
  logVerbosityLevel: 2
}
