const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function checkPM2() {
    try {
        await ssh.connect(config);
        const res = await ssh.execCommand('pm2 list');
        console.log(res.stdout);
        process.exit(0);
    } catch (err) {
        console.error('AUTH FAILED:', err);
        process.exit(1);
    }
}

checkPM2();
