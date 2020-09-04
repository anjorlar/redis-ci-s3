const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util')
const redisURL = process.env.REDISURL
const client = redis.createClient(redisURL)
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec;

// pass in an options object but it is defaulted to an empty object incase the person does not pass an option
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '') // PASS AND EMPTY STRING INCASE KEY IS NOT PASSED
    return this
}


mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments)
    }
    // console.log('running a new query')
    // console.log('>>>>>>>', this.getQuery())
    // console.log('>>>>>>> mongooseCollection', this.mongooseCollection.name)

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }))

    // see if we have a value for key in redis
    const cachedValue = await client.hget(this.hashKey, key)

    // if we do return the value for the cachedValue
    if (cachedValue) {
        const doc = JSON.parse(cachedValue)

        return Array.isArray(doc)
            ? doc.map(item => new this.model(item))
            : new this.model(doc)
    }

    // otherwise issue query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EXPIRE', 10)
    return result
}

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
}