const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function checkOS() {
    try {
        await ssh.connect(config);
        const res = await ssh.execCommand('cat /etc/os-release && free -m && df -h');
        console.log(res.stdout);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkOS();
