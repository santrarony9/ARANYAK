const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function checkStatus() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED.');
        const res = await ssh.execCommand('pm2 status');
        console.log('STDOUT:', res.stdout);
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err);
        process.exit(1);
    }
}

checkStatus();
