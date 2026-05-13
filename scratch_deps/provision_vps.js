const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function setup() {
    try {
        console.log('Connecting to new VPS (117.252.16.132)...');
        await ssh.connect(config);
        console.log('CONNECTED.');

        const commands = [
            'apt-get update',
            'curl -fsSL https://deb.nodesource.com/setup_20.x | bash -',
            'apt-get install -y nodejs nginx git',
            'npm install -g pm2',
            'mkdir -p /var/www/aranyak',
            'chown -R root:root /var/www/aranyak'
        ];

        for (const cmd of commands) {
            console.log(`Executing: ${cmd}`);
            const res = await ssh.execCommand(cmd);
            if (res.stderr && !cmd.includes('npm')) console.warn('Warning:', res.stderr);
        }

        console.log('SERVER PROVISIONED SUCCESSFULLY.');
        process.exit(0);
    } catch (err) {
        console.error('SETUP FAILED:', err);
        process.exit(1);
    }
}

setup();
