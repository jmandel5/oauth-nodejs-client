const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost.dev.onshape.com',(err,connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queueName = 'Info';
        let message = {
            client_id:"" ,
            client_secret:"",
            access_token:"",
            refresh_token:"",
            base_url:"https://demo-c.dev.onshape.com",
            oauth_url:"https://demo-c-oauth.dev.onshape.com/oauth/token"
        }
        channel.assertQueue(queueName, {
            durable: false
        });
        console.log('Message : ' + JSON.stringify(message));
        channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
        setTimeout(() => {
            connection.close()
        }, 1000)
    })

})

amqp.connect('amqp://localhost.dev.onshape.com',(err,connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queueName = 'Client-to-Server';
        let message = {
            first_path: "assemblies",
            second_path: "namedViews",
            d: "",
            w: "",
            e: ""
        }
        channel.assertQueue(queueName, {
            durable: false
        });
        console.log('Message : ' + JSON.stringify(message));
        channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
        setTimeout(() => {
            connection.close()
        }, 1000)
    })

})



amqp.connect('amqp://localhost.dev.onshape.com',(err,connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queueName = 'Server-to-Client';
        channel.assertQueue(queueName, {
            durable: false
        });
        channel.consume(queueName, (msg) => {
            console.log('Received the message: ' +  msg.content.toString());
        }, {
            noAck: true
        })
    })

})

