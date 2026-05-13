const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function setup() {
    try {
        console.log('Connecting to AlmaLinux VPS (117.252.16.132)...');
        await ssh.connect(config);
        console.log('CONNECTED.');

        const commands = [
            'dnf update -y',
            'dnf module enable nodejs:20 -y',
            'dnf install -y nodejs nginx git',
            'npm install -g pm2',
            'mkdir -p /var/www/aranyak',
            'chown -R root:root /var/www/aranyak',
            'systemctl enable nginx',
            'systemctl start nginx'
        ];

        for (const cmd of commands) {
            console.log(`Executing: ${cmd}`);
            const res = await ssh.execCommand(cmd);
            console.log(res.stdout);
            if (res.stderr && !cmd.includes('npm') && !cmd.includes('update')) {
                console.warn('Warning:', res.stderr);
            }
        }

        console.log('SERVER PROVISIONED SUCCESSFULLY ON ALMALINUX.');
        process.exit(0);
    } catch (err) {
        console.error('SETUP FAILED:', err);
        process.exit(1);
    }
}

setup();
