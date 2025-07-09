const { spawn } = require('child_process');

const ESP_IP = process.env.ESP_RTSP_URL;
const RTMP_URL = process.env.RTMP_PUSH_URL;

console.log(`Starting FFmpeg to pull from ${ESP_IP} and push to ${RTMP_URL}`);

const ffmpeg = spawn('ffmpeg', [
  '-rtsp_transport', 'tcp',
  '-i', ESP_IP,
  '-c:v', 'copy',
  '-f', 'flv',
  RTMP_URL
]);

ffmpeg.stderr.on('data', (data) => {
  console.error(`ffmpeg stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
  console.log(`ffmpeg exited with code ${code}`);
});
