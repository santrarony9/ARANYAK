const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function test() {
    try {
        await ssh.connect({
            host: '117.252.16.132',
            username: 'root',
            password: '$9T%Lk057bzu'
        });
        console.log('CONNECTION_OK');
        process.exit(0);
    } catch (e) {
        console.error('CONNECTION_FAILED', e.message);
        process.exit(1);
    }
}

test();
