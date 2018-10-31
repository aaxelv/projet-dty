<!-- La page admin sert à afficher les notes de frais lié à l'admin actuellement identifié-->

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

import {Issue} from '../../issue.model';
import {IssueService} from '../../issue.service';
import {AccountService} from '../../account.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css','../../../../../bootstrap/css/bootstrap.min.css']
})
export class AdminComponent implements OnInit {
  createForm: FormGroup;

  issues: Issue[];
  displayedColumns = ['responsible','title', 'date','ammount','devise','description', 'status','objection', 'actions']

  constructor(private fb: FormBuilder, private accountService: AccountService, private issueService: IssueService, private router : Router) { }

  ngOnInit() {
  this.fetchIssues();
  }

  fetchIssues() {
  	this.issueService
  		.getIssues()
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

  examineIssue(id) {
  	this.router.navigate([`/judge/${id}`]);
  }
}
