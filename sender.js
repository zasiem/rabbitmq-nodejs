var amqp = require('amqplib/callback_api');

//connect to mqrabbit server
amqp.connect('amqp://localhost', function (error0, connection) {

    //error throw when connecting    
    if (error0) {
        throw error0;
    }

    //create channel 
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = 'Hello Erza!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});