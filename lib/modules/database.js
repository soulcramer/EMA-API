let aerospike = require('aero-aerospike');

ema.db = aerospike.client(require('../../config.json').database);

ema.db.connect().then(() => console.log('Successfully connected to database!'));

ema.get = ema.db.get;
ema.set = ema.db.set;
ema.remove = ema.db.remove;
ema.forEach = ema.db.forEach;
ema.filter = ema.db.filter;
ema.all = ema.db.all;
ema.batchGet = ema.db.getMany;

ema.addProperties = (set, properties) => {
    let tasks = [];

    ema.forEach(set, entry => {
        tasks.push(ema.set(set, entry.id, properties))
    })
        .then(() => Promise.all(tasks))
        .then(() => console.log(`Added properties to ${tasks.length} records`))
};
