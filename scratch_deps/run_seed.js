const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function runSeed() {
    try {
        await ssh.connect(config);
        console.log('SYNCING CODE...');
        await ssh.execCommand('cd /var/www/aranyak && git fetch origin && git reset --hard origin/master');
        
        console.log('RUNNING SEED...');
        const res = await ssh.execCommand('cd /var/www/aranyak/backend && npx prisma db seed');
        console.log(res.stdout);
        console.log(res.stderr);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

runSeed();
