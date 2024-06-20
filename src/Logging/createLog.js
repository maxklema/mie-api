const myLedger = require('../Logging/createLedger');
const { logging } = require('../Variables/variables');

function createLog(level, message){
    
    if (logging.value == "true"){

        switch(level){
            case "info":
                myLedger.ledger.log("info", message, 0);
                break;
            case "error":
                process.on('uncaughtException', (err) => {
                    console.error(err);
                    myLedger.ledger.log('error', `Uncaught Exception:`, err, function() {
                        process.exitCode = 1;
                    });
                });
        }
    }
}

module.exports = { createLog }