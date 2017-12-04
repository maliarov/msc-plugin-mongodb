const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

module.exports = PluginFactory;


function PluginFactory({

} = {}) {
    return {
        onPreInit,
        //onInit,
        onStart,
        onStop
    };


    function onPreInit(context) {
        context.mongodb = mongodb;
    }

    async function onStart(context) {
        const uri = await context.get('mongodb.uri');
        context.mongodb.db = await MongoClient.connect(uri);
    }

    async function onStop(context) {
        await context.mongodb.db.close();
    }
}