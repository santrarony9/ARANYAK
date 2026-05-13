const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function startBackend() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED.');
        console.log('Starting backend...');
        const res = await ssh.execCommand('cd /var/www/aranyak/backend && pm2 start dist/main.js --name aranyak-backend');
        console.log('STDOUT:', res.stdout);
        console.log('STDERR:', res.stderr);
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err);
        process.exit(1);
    }
}

startBackend();
