const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function check() {
    try {
        await ssh.connect({
            host: '117.252.16.132',
            username: 'root',
            password: '$9T%Lk057bzu'
        });
        const res = await ssh.execCommand('cat /etc/os-release');
        console.log(res.stdout);
        
        console.log('--- VERSIONS ---');
        const nodeV = await ssh.execCommand('node -v');
        console.log('node:', nodeV.stdout || 'NOT_FOUND');
        const nginxV = await ssh.execCommand('nginx -v');
        console.log('nginx:', nginxV.stderr || nginxV.stdout || 'NOT_FOUND');
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
