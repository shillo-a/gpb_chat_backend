
import SequelizeAuto from 'sequelize-auto';

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;
const schema = process.env.DB_SCHEMA;

const config = './src/scripts/options'
// const output = `./src/models/${Date.now()}/`
const output = `./src/models/`

const initSequelizeAuto = new SequelizeAuto(undefined, undefined, undefined, {
    dialect: dialect,
    directory: output, 
    storage: './src/database/dev.sqlite',
    port: 3306,
    host: 'localhost',
    caseModel: 'p', 
    caseFile: 'p', 
    
    additional: {
        timestamps: true, // (createdAt, updatedAt)
        paranoid: true, // for soft delere (deletedAt)
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        // ...options added to each model
    },
    lang: 'esm'
});


initSequelizeAuto.run().then(data => {
    console.log(data.tables);      // table and field list
    console.log(data.foreignKeys); // table foreign key list
    console.log(data.indexes);     // table indexes
    console.log(data.hasTriggerTables); // tables that have triggers
    console.log(data.relations);   // relationships between models
    console.log(data.text);         // text of generated models
    console.log('Done!')
});

// const createModelFromDb =  `node_modules\.bin\sequelize-auto -h ${host} -d ${database} -u ${username} -x ${password} -p ${port} --dialect ${dialect} -o ${output} -s ${schema} -l esm`
// console.log(createModelFromDb)

// Options:
//     --help               Show help                                   [boolean]
//     --version            Show version number                         [boolean]
// -h, --host               IP/Hostname for the database.                [string]
// -d, --database           Database name.                               [string]
// -u, --user               Username for database.                       [string]
// -x, --pass               Password for database. If specified without providing
//                           a password, it will be requested interactively from
//                           the terminal.
// -p, --port               Port number for database (not for sqlite). Ex:
//                           MySQL/MariaDB: 3306, Postgres: 5432, MSSQL: 1433
//                                                                       [number]
// -c, --config             Path to JSON file for Sequelize-Auto options and
//                           Sequelize's constructor "options" flag object as
//                           defined here:
//                           https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
//                                                                       [string]
// -o, --output             What directory to place the models.          [string]
// -e, --dialect            The dialect/engine that you're using: postgres,
//                           mysql, sqlite, mssql                         [string]
// -a, --additional         Path to JSON file containing model options (for all
//                           tables). See the options: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init
//                                                                       [string]
// -t, --tables             Space-separated names of tables to import     [array]
// -T, --skipTables         Space-separated names of tables to skip       [array]
//     --caseModel, --cm    Set case of model names: c|l|o|p|u
//                           c = camelCase
//                           l = lower_case
//                           o = original (default)
//                           p = PascalCase
//                           u = UPPER_CASE
//     --caseFile, --cf     Set case of file names: c|l|o|p|u
//     --caseProp, --cp     Set case of property names: c|l|o|p|u
// --noAlias                Avoid creating alias `as` property in relations        
//                                                                      [boolean]
// --noInitModels           Prevent writing the init-models file        [boolean]
// -n, --noWrite            Prevent writing the models to disk          [boolean]
// -s, --schema             Database schema from which to retrieve tables[string]
// -v, --views              Include database views in generated models  [boolean]
// -l, --lang               Language for Model output: es5|es6|esm|ts
//                           es5 = ES5 CJS modules (default)
//                           es6 = ES6 CJS modules
//                           esm = ES6 ESM modules
//                           ts = TypeScript                              [string]
//     --singularize, --sg  Singularize model and file names from plural table
//                           names                                       [boolean]