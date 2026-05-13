const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const config = {
    host: '117.252.16.132',
    username: 'root',
    password: '$9T%Lk057bzu'
};

async function setupEnv() {
    try {
        await ssh.connect(config);
        console.log('CONNECTED.');
        const envContent = `DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/aranyak_jewellers?retryWrites=true&w=majority"
JWT_SECRET="aranyak_secret_key_change_in_production"
PORT=3001
FRONTEND_URL="https://frontend-omega-five-58.vercel.app"`;

        await ssh.execCommand(`echo '${envContent}' > /var/www/aranyak/backend/.env`);
        console.log('.env template created at /var/www/aranyak/backend/.env');
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err);
        process.exit(1);
    }
}

setupEnv();
