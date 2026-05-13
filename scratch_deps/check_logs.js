const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function checkLogs() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED.');
        const res = await ssh.execCommand('pm2 logs aranyak-backend --lines 20 --nostream');
        console.log('LOGS:', res.stdout);
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err);
        process.exit(1);
    }
}

checkLogs();
