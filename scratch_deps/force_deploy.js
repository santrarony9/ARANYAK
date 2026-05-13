const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function forceDeploy() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED TO VPS.');

        const commands = [
            'cd /var/www/aranyak && rm -f .git/index.lock',
            'cd /var/www/aranyak && git fetch origin && git reset --hard origin/master',
            'cd /var/www/aranyak/backend && npm install && npm run build',
            'cd /var/www/aranyak/backend && npx prisma generate',
            'pm2 restart aranyak-backend || (cd /var/www/aranyak/backend && pm2 start dist/src/main.js --name aranyak-backend)',
            'cd /var/www/aranyak/Frontend && npm install && npm run build'
        ];

        for (const cmd of commands) {
            console.log(`Executing: ${cmd}`);
            const res = await ssh.execCommand(cmd);
            console.log(res.stdout);
            if (res.stderr) console.warn('Note:', res.stderr);
        }

        console.log('DEPLOYMENT COMPLETE.');
        process.exit(0);
    } catch (err) {
        console.error('DEPLOYMENT FAILED:', err);
        process.exit(1);
    }
}

forceDeploy();
