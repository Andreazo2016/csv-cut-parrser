const { spawn } = require('child_process')

async function extractColumn({ 
    removeHeaders = false,
    delimiter = ';',
    filePath = null,
    columnIndex = 1,
    callback = null
}) {
    if (!filePath) throw new Error('filePath must be provided')
    if (!callback) throw new Error('callback must be provided')
    const lsProcess = spawn(`cut`, ['-d', delimiter,'-f', columnIndex, filePath])
    lsProcess.stdout.on("data", (data) => {
        String(data).split('\n').forEach(item => callback(item))
    })
    lsProcess.stderr.on("data", (data) => {
        console.log(`stdout: ${data}`)
    })
    lsProcess.on("exit", (code) => {
        console.log(`Process ended with ${code}`);
    })
}

module.exports = extractColumn