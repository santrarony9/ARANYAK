const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function check() {
    try {
        await ssh.connect({
            host: '117.252.16.132',
            username: 'root',
            password: '$9T%Lk057bzu'
        });
        const res = await ssh.execCommand('ps aux | grep dnf');
        console.log('--- DNF PROCESSES ---');
        console.log(res.stdout);
        
        const load = await ssh.execCommand('uptime');
        console.log('--- SYSTEM LOAD ---');
        console.log(load.stdout);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
