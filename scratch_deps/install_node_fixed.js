const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function installNode() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED.');

        console.log('Enabling nodejs:20 module...');
        await ssh.execCommand('dnf module enable nodejs:20 -y');
        
        console.log('Installing nodejs...');
        const res = await ssh.execCommand('dnf install -y nodejs');
        console.log(res.stdout);
        console.log(res.stderr);

        const v = await ssh.execCommand('node -v');
        console.log('NODE VERSION:', v.stdout);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

installNode();
