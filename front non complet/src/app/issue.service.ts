<!-- On laisse ici toutes les procédures liés aux notes de frais, suppression de ndf, modification de ndf, requete de ndf, création de ndf -->


import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
	
	uri = "http://localhost:4000";

  constructor(private http:HttpClient) { }

  getIssues() {
  	return this.http.get(`${this.uri}/issues`,{withCredentials: true});
  }

  getIssuesById(id) {
    return this.http.get(`${this.uri}/issues/${id}`, {withCredentials: true});
  }

  getIssuesByName(title) {
    return this.http.get(`${this.uri}/issues/search/${title}`, {withCredentials: true});
  }


  addIssue(title,date,ammount,devise,description) {
  	const issue = {
  		title : title,
  		date : date,
      ammount: ammount,
      devise : devise,
  		description : description
  	};
  	return this.http.post(`${this.uri}/issues`, issue , {withCredentials:true}  );
  }

  updateIssue(id,title,date,ammount, devise,description,status,justification,objection) {
  	const issue = {
  		title : title,
      date: date,
  		ammount : ammount,
  		devise : devise,
  		description: description,
      status : status,
      justification: justification,
      objection : objection
  	};
    return this.http.put(`${this.uri}/issues/${id}`, issue, {withCredentials: true});
  }

  deleteIssue(id) {
  	return this.http.delete(`${this.uri}/issues/${id}`, {withCredentials: true});
  }

}
