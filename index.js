const express = require('express');
const { exec, spawn } = require('child_process');
const path = require('path');
const app = express();
const PORT = 5000;

app.post('/update', async (req, res) => {

    try {
        const update = await exec('sudo git pull --rebase', { cwd: '/home/pjlangsam/Redwood' });
        const restart = await spawn('pm2', ['restart', '1']);
        // update.stdout.on('data', (data) => console.log(`${data}`))
        // update.stderr.on("data", data => console.log(`${data}`));
        // update.on('close', async () => {
        //     console.log('Update Done');
        //     const restart = await spawn('pm2', ['restart', '1']);
            
            restart.on('close', () => {
                console.log('Restarting!');
                res.status(200).send({ success: true })
            })
        // })
    } catch (err) {
        res.status(400).send({ error: `Error pulling and restarting bot ${err}`})
    }
})

app.post('/kick', async(req, res) => {
    try {
        const restart = await spawn('pm2', ['restart', '1']);
            
        restart.on('close', () => res.status(200).send({ success: true }))
    } catch (err) {
        res.status(400).send({ error: `Error pulling and restarting bot ${err}`})
    }
})


app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})