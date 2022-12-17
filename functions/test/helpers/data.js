
const DeleteEntityById = require('test/data/delete-entity-by-id');
const definations = require('test/data/factory').factory;


const dontBuild = () => new Promise((resolve, reject) => resolve({}));

const idWhenPresent = entity => (entity ? entity.id : null);

const whenPresent = (entity, successArgs) => (entity ? successArgs : []);

const deleteWhenPresent = entity => whenPresent(entity, [new DeleteEntityById([idWhenPresent(entity)])]);

const doNothing = () => [];

const entity = async (name, replace) => new Promise(async (resolve, reject) => {
    let data = await definations.build(name);
    if (replace) {
        data = replace(data);
    }
    resolve(data);
});

const buildEntity = name => entity(name);

const returnObject = args => args;

const user = {
    name: 'user',
    create: user => [
    ],
    build: () => entity('user'),
    delete: user => [new DeleteEntityById(user.id, 'User')]
};


module.exports = {
    buildEntity,
    user

};
