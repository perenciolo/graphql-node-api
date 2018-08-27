import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

import { DbConnection } from './../interfaces/DbConnectionInterface';

const basename: string = path.basename(module.filename);
const env: string = 'development' || process.env.NODE_ENV;
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];

let db = null;

if (!db) {
  db = {};
  const operatorsAliases = false;

  config = Object.assign({ operatorsAliases }, config);
  
  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  // Load models to Sequelize and saves each item on db array
  fs.readdirSync(__dirname)
    .filter((file: string) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    })
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model['name']] = model;
    });

  // For each db model key it verifies if the current element has the key associate and in case of true calls the method passing db
  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;
}

export default <DbConnection>db;
