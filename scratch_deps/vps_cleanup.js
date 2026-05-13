const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function cleanAndReset() {
    try {
        await ssh.connect({
            host: '117.252.16.132',
            username: 'root',
            password: '$9T%Lk057bzu'
        });
        console.log('CONNECTED.');
        
        console.log('CLEANING NODE_MODULES...');
        await ssh.execCommand('rm -rf /var/www/aranyak/backend/node_modules /var/www/aranyak/Frontend/node_modules /var/www/aranyak/.git/index.lock');
        
        console.log('GIT FETCH & RESET...');
        const res = await ssh.execCommand('cd /var/www/aranyak && git fetch origin && git reset --hard origin/master');
        console.log('STDOUT:', res.stdout);
        console.log('STDERR:', res.stderr);
        
        console.log('CLEANUP COMPLETE.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

cleanAndReset();
