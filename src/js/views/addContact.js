import React, {useState, useContext,useEffect} from "react";
import { Context } from "../store/appContext";
import { Link,useParams } from "react-router-dom";
import "../../styles/home.css";

export const AddContact = () => {
	const {store,actions} = useContext(Context)
	const params = useParams();
	
	function submitForm(e){

		console.log(e);
		e.preventDefault()
		let dataForm = new FormData(e.target)
		let data = {}
		let campos= ["full_name","address","phone","email"]
		campos.forEach(campo => data[campo]=dataForm.get(campo))
		data.agenda_slug = "Jparedes"
		console.log(data)
		// actions.addContacts(data)
		if( !params.id ){
			actions.addContacts(data)
		}
		else{
			actions.editContacts(data,params.id)
		}
	}

	return (
	<div className="text-center mt-5">
		<ul className = "list-group">
			<li className = "list-group-item">
			<form onSubmit={submitForm}>
			<h1>Add a new contact</h1>
			<div className="mb-3">
   			 <label htmlFor="exampleInputName" className="form-label d-flex justify-content-start">Full Name</label>
   			 <input type="text" className="form-control" id="exampleInputName" placeholder = "Full Name" name ="full_name"/>
  			</div>
			<div className="mb-3">
   			<label htmlFor="exampleInputEmail1" className="form-label d-flex justify-content-start">Email address</label>
    		<input type="email" className="form-control" id="exampleInputEmail1" placeholder = "Enter email"  name ="email" aria-describedby="emailHelp"/>
 			</div>
 			<div className="mb-3">
    		<label htmlFor="exampleInputPhone" className="form-label d-flex justify-content-start">Phone</label>
    		<input type="text" className="form-control" id="exampleInputPhone" placeholder = "Enter phone" name ="phone" />
  			</div>
  			<div className="mb-3">
    		<label htmlFor="exampleInputAddress" className="form-label d-flex justify-content-start">Address</label>
    		<input type="text" className="form-control" id="exampleInputAddress" placeholder = "Enter address" name="address"/>
  			</div>
			<button type="submit" className="btn btn-success form-control"> Save </button>
			</form>
			</li>
			<Link to="/">
				<p className="text-primary">Or get back to contacts</p>
			</Link>
		</ul>	
	</div>
);
}
