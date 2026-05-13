const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function checkNginx() {
    try {
        await ssh.connect(config);
        console.log('NGINX CONF.D:');
        const lsRes = await ssh.execCommand('ls /etc/nginx/conf.d/');
        console.log(lsRes.stdout);
        
        console.log('\nNGINX.CONF:');
        const catRes = await ssh.execCommand('cat /etc/nginx/nginx.conf');
        console.log(catRes.stdout);

        if (lsRes.stdout.trim()) {
            const files = lsRes.stdout.split('\n');
            for (const file of files) {
                if (file.trim()) {
                    console.log(`\nFILE: ${file}`);
                    const fileRes = await ssh.execCommand(`cat /etc/nginx/conf.d/${file}`);
                    console.log(fileRes.stdout);
                }
            }
        }
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkNginx();
