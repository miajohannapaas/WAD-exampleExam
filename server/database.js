const Pool = require('pg').Pool;
//ütleb siin kes ühendub, mis andembaas ja kus server
const pool = new Pool({
    user: "postgres",
    password: "uusparool", // Enter your password here
    database: "WADexam", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});
//mis tehakse kui server käivitub
const execute = async(createTblQuery, insertDataQuery) => { 
    try {
        await pool.connect();//loob ühenduse db-ga
        await pool.query(createTblQuery);//loob tabeli
        await pool.query(insertDataQuery);//lisab algandmed
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};
//tabeli loomine ja algandmete lisamine
const createTblQuery = ` 
    CREATE TABLE IF NOT EXISTS "routes" (
        "id" SERIAL PRIMARY KEY,  
        "fromcity" VARCHAR(200) NOT NULL,
        "tocity" VARCHAR(200) NOT NULL,  
        "cost" integer NOT NULL, 
        "departuretime" VARCHAR(200) NOT NULL,
        "departuredate" VARCHAR(200) NOT NULL
        );`;

const insertDataQuery = `WITH data (fromcity, tocity, cost, departuretime, departuredate) AS 
    (
    VALUES
    ('Tartu', 'Tallinn', 14, '06:00:00', '2022-03-24'),  
    ('Tartu', 'Tallinn', 14, '08:00:00', '2022-03-24'),
    ('Tartu', 'Parnu ', 11, '10:00:00', '2022-03-24'),
    ('Tartu', 'Narva', 15, '10:30:00', '2022-03-24'),
    ('Tartu', 'Tallinn', 12, '11:00:00', '2022-03-24'), 
    ('Tartu', 'Parnu', 12, '12:00:00', '2022-03-24')
    )
    INSERT INTO routes(fromcity, tocity, cost, departuretime, departuredate) 
    SELECT  d.fromcity, d.tocity, d.cost, d.departuretime, d.departuredate
    FROM data d
    WHERE NOT EXISTS (SELECT * FROM routes WHERE id = 1);
`

execute(createTblQuery, insertDataQuery).then(result => {
    if (result) {
        console.log('If does not exists, table "routes" is created');
    }
});

module.exports = pool;//lubab server.js seda ühendust kasutada