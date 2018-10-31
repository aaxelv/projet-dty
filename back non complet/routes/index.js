// Ce fichier gère les routes pour les notes de frais : acquérir les notes de frais,
// les modifier, supprimer


import express from 'express';
import Issue from './../models/issue'
import Account from './../models/account'


const router = express.Router();

export function routess() {

	router.route('/issues').get((req,res)=> {
		if (!req.user){
			res.json("Not logged in")
		}
		else if (req.user.class === 'admin') {
			Issue.find({responsible: req.user.connection}, (err,issues) => {
				if (err)
					consolelog(err)
				else
					res.json(issues);
			})
		}	
		else {
			Issue.find({responsible: req.user.username},(err,issues) =>{
			if (err)
				console.log(err);
			else
				res.json(issues);	
		});
		}
	});

	router.route('/issues/:id').get((req,res)=> {
		Issue.findById(req.params.id, (err,issue) =>{
			if (err)
				console.log(err);
			else
				res.json(issue);
		});
	});

// Utile pour les recherches par nom
	router.route('/issues/search/:name').get((req,res)=> {
	Issue.find({title :req.params.name, responsible : req.user.username}, (err,issue) =>{
			if (err)
				console.log(err);
			else
				res.json(issue);
		});	
	});

	router.route('/issues').post((req,res) => {
		if (!req.user){
			res.json('Not logged in')
		}
		else {
		let title = String(req.body.title);
		let date = String(req.body.date);
		let ammount = String(req.body.ammount);
		let devise = String(req.body.devise);
		let description = String(req.body.description);
		let responsible = req.user.username;

		let issue = new Issue({title, responsible, date, ammount, devise, description});
		issue.save()
			.then(issue => {
				res.status(200).json({'issue': 'Added successfully'});
			})
			.catch(err => {
				res.status(400).send('Failed to create new record');
			})
		}
	})

	router.route('/issues/:id').put((req,res) => {
		if (!req.user){
			res.json('Not logged in')
		}
		else {
		Issue.findById(req.params.id, (err,issue) => {
			if (!issue){
				return (new Error('Could not load document'))
				}
			else {
				issue.title = req.body.title;
				issue.date = req.body.date;
				issue.ammount = req.body.ammount;
				issue.devise = req.body.devise;
				issue.description = req.body.description;
				issue.status = req.body.status;
				issue.justification = req.body.justification;
				issue.objection = req.body.objection;
				issue.save().then(issue => {
					res.json('Update done');

				}).catch(err => {
					res.status(400).send('Update failed');
				});
			}
		})
		}	
	})

	router.route('/issues/:id').delete((req,res) => {
		if (!req.user){
			res.json('Not logged in');
		}
		else {	
		Issue.findByIdAndRemove({_id: req.params.id}, (err,issue) =>{
			if (err)
				res.json(err)
			else
				res.json('Remove successfully');
		})
	}
	})
	return router;
}
