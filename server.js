const { spawn } = require('child_process');
require('dotenv').config();

const ESP_STREAM_URL = process.env.ESP_STREAM_URL;
const RTMP_PUSH_URL = process.env.RTMP_PUSH_URL;



console.log(`Starting FFmpeg to pull from ${ESP_STREAM_URL} and push to ${RTMP_PUSH_URL}`);

const ffmpeg = spawn("ffmpeg", [
  "-f", "mjpeg",
  "-i", ESP_STREAM_URL,
  "-c:v", "libx264",
  "-f", "flv",
  RTMP_PUSH_URL
]);


ffmpeg.stderr.on('data', (data) => {
  console.error(`ffmpeg stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
  console.log(`ffmpeg exited with code ${code}`);
});
