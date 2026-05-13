const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function listFiles() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED.');
        const res = await ssh.execCommand('find /var/www/aranyak/backend/dist -maxdepth 2');
        console.log('FILES:', res.stdout);
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err);
        process.exit(1);
    }
}

listFiles();
