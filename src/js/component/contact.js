
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Contact = () => {
  const { store, actions } = useContext(Context);
  const contactIdToDelete = useRef(null); // Crear una referencia para el ID del contacto a eliminar

  useEffect(() => {
    actions.getContacts();
  }, []);

  const deleteContact = (id) => {
    contactIdToDelete.current = id; // Almacenar el ID del contacto en la referencia
    actions.deleteContacts(id);
  };

  return (
    <div>
     <div className = "d-flex justify-content-end me-3"> 
      <Link to="/addContact">
      <button type="button" className="btn btn-success my-3">
      Add new Contact
      </button>
      </Link>
     </div>
     {store.contacts && store.contacts.length > 0 && store.contacts.map((contact, index) => (
     	<div key={index} className="card row g-0 flex-row py-2 mx-3">
         <div className="col-md-4  pt-3 d-flex justify-content-center">
        	<img src="https://fastly.picsum.photos/id/912/150/150.jpg?hmac=UWxwaeBpIQmN1qBLf-OYHCkdLeB5h1ctjq65RsNncao" className="rounded-circle" style ={{ height : "150px", width: "150px"}} alt="..."/>
         </div>
         <div className="col-md-6">
           <div className="card-body ">
           <h5 className="card-title">{contact.full_name}</h5>
           <p className="card-text text-secondary"><i className="fas fa-map-marker-alt">  {contact.address}</i></p>
           <p className="card-text text-secondary"><i className="fas fa-phone">  {contact.phone}</i></p>
           <p className="card-text text-secondary"><i className="fas fa-envelope">  {contact.email}</i></p>
           </div>
         </div>
         <div className="col-md-2 pt-3">
			<Link to={"/edit/" + contact.id}>
           <i className="fas fa-pencil-alt me-4">
           </i>
           </Link>
            <i data-bs-toggle="modal" data-bs-target="#delete" className="fas fa-trash-alt"
                // Almacenar el ID del contacto en la referencia al abrir el modal
                onClick={() => (contactIdToDelete.current = contact.id)}
            ></i>
         </div>
         	<div className="modal" id="delete" tabIndex="-1">
              <div className="modal-dialog">
           		<div className="modal-content">
					<div className="modal-header">
      					<h5 className="modal-title">Are you sure?</h5>
        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      				</div>
      				<div className="modal-body">
       					<p>If you delete this thing the entire universe will go down!</p>
		  			</div>
           			<div className="modal-footer">
            			<button type="button" className="btn btn-primary" data-bs-dismiss="modal">Oh no!</button>
            			<button onClick={() => deleteContact(contactIdToDelete.current)} type="button" className="btn btn-secondary"
            			data-bs-dismiss="modal" > Yes baby!</button>
                  	</div>
                </div>
              </div>
            </div>
        </div>
        ))}
    </div>
  );
};