module.exports = class RunQuery {
    constructor(query, queryParameter) {
        this.query = query;
        this.queryParameter = queryParameter;
    }

    get() {
        return this.query;
    }

    parameter() {
        return this.queryParameter;
    }

    transform(record) {
        return record.get(0);
    }
};
