// La page judge/:id sert à afficher la note de frais de l'user, lié à l'admin //actuellement identifié, pour la juger la commenté, la valider ou non :
//On peut la valider, la mettre en attente (valider sous conditions), la laisser ouverte //pour permettre une remarque, ou l'invalider

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {FormGroup, FormBuilder} from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import { MatSnackBar } from '@angular/material';

import {Issue} from '../../issue.model';
import {IssueService} from '../../issue.service';
import {AccountService} from '../../account.service';


@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css','../../../../../bootstrap/css/bootstrap.min.css']
})


export class JudgeComponent implements OnInit {

  issues: any ={};
  id : String;
  updateForm: FormGroup;

  constructor(private accountService: AccountService,  private snackBar: MatSnackBar, private route: ActivatedRoute, private issueService: IssueService, private router : Router, private fb : FormBuilder) {
  	this.createForm();
   }

  createForm() {
	  this.updateForm = this.fb.group({
	   status : '' ,
	   justification: ''
	  })}

  ngOnInit() {
	  this.route.params.subscribe(params =>{
		  this.id = params.id;
	  	this.issueService.getIssuesById(this.id).subscribe( (res:any) => {
	  			console.log(res)
	  			this.issues = res;
	  			this.updateForm.get('status').setValue(this.issues.status);
	  			this.updateForm.get('justification').setValue(this.issues.justification);
	  		});
	  } )
	  this.fetchIssues();

  }

  fetchIssues() {
  	this.issueService
  		.getIssuesById(this.id)
      .subscribe((data: any) => {if(data === "Not logged in") {
      this.router.navigate(['/login']);
      }
  		else {
  			this.issues = data;
  			console.log('Data requested..');
  		} })
  }


  disconnect() {
    this.accountService.disconnect().subscribe(() =>this.router.navigate([`/login`]))
    }


  updateIssue(status,justification) {
    this.issueService.updateIssue(this.id, this.issues.title, this.issues.date, this.issues.ammount, this.issues.devise, this.issues.description, status||this.issues.status, justification, this.issues.objection).subscribe((data) => {
      if(data === 'Not logged in'){
        this.router.navigate(['/login'])
      }
      else{
      this.snackBar.open  ('Issue updated successfully', 'Ok', {
        duration : 3000
      })
      }
    })
  }


}
