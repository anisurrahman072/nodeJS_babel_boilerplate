import fs from "fs";
import path from "path";
import { RtcTokenBuilder, RtcRole } from "agora-token";

const AGORA_APP_ID = "*****";
// const APP_CERTIFICATE = "******"; // Secondary Certificate
const APP_CERTIFICATE = "*****"; // Primary Certificate
const channelName = "Agora*"; // Customize this
const uid = 0; // Set to 0 for wildcards
const role = RtcRole.PUBLISHER; // Adjust as needed
const expirationTimeInSeconds = 5 * 365 * 24 * 60 * 60; // 5 years

try {
  const token = RtcTokenBuilder.buildTokenWithUid(
    AGORA_APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    expirationTimeInSeconds
  );

  fs.writeFileSync(
    path.join(__dirname, "agoraToken", "agoraToken.txt"),
    JSON.stringify(token)
  );
} catch (error) {
  console.log("THE ERROR: ", error);
}
