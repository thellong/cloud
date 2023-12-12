const express = require('express');

const router = express.Router();

const database = require('../database');

const itemsPool = require('../DBConfig.js');

router.get("/", (request, response, next) => {

	response.render('sample_data', {title : 'Node JS PostgreSQL Ajax Application'});

});

router.get('/', async(req, res) => {
    try {
        const sample_data = await itemsPool.query(
            'SELECT * FROM sample_data'
        );
        res.json({ sample_data });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

router.post("/action", async (req, res, next) => {

	const action = req.body.action;

	if(action == 'fetch')
	{
		try {
			const sample_data =  await itemsPool.query(
				'SELECT * FROM sample_data ORDER BY id ASC'
			);
			res.json({
				data: sample_data.rows
			})
		} catch (error) {
			res.status(500).send(error.message)
		}
		
		// const query = 'SELECT * FROM sample_data ORDER BY id ASC';

		// database.query(query, function(error, data){

		// 	res.json({
		// 		data: data.rows
		// 	});

		// });
		
	}

	if (action == 'Add') {
		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const age = req.body.age;
		const gender = req.body.gender;
		
		// const query = `INSERT INTO sample_data 
		// 			 (first_name, last_name, gender, age) 
		// 			 VALUES ($1, $2, $3, $4)`;
	  
		// database.query(query, [first_name, last_name, gender, age], (error, data) => {
		//   res.json({
		// 	message: 'Data Added'
		//   });
		// });

		try {
			const query = await itemsPool.query("INSERT INTO sample_data (first_name, last_name, gender, age) values ($1, $2, $3, $4);");
			res.json({
				message: "New student added",
				item: query.rows
		});
		} catch (error) {
			res.status(500).send(error.message);
		}
	  }

	if(action == 'fetch_single')
	{
		const id = req.body.id;

		const query = `SELECT * FROM sample_data WHERE id = '${id}'`;

		database.query(query, (error, data) => {

			res.json(data.rows[0]);

		});
	}

	if(action == 'Edit')
	{
		const id = req.body.id;

		const first_name = req.body.first_name;

		const last_name = req.body.last_name;

		const gender = req.body.gender;

		const age = req.body.age;

		const query = `
		UPDATE sample_data 
		SET first_name = '${first_name}', 
		last_name = '${last_name}', 
		age = '${age}', 
		gender = '${gender}' 
		WHERE id = '${id}'
		`;

		database.query(query, (error, data) => {
			res.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		const id = req.body.id;

		const query = `DELETE FROM sample_data WHERE id = '${id}'`;

		database.query(query, (error, data) => {

			res.json({
				message : 'Data Deleted'
			});

		});
	}


	if (action == 'search') {
        const searchValue = req.body.searchValue;
        const query = `SELECT * FROM sample_data WHERE column_name ILIKE '%${searchValue}%'`;

        database.query(query, (error, data) => {
            res.json({
                data: data.rows
            });
        });
    }

});

module.exports = router;