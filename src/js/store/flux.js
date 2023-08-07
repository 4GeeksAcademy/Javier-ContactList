const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			getContacts : async()=>{
				try {
					
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/Jparedes");
					// Verificar si la respuesta está en el rango de 200-299 (éxito)
					if (!response.ok) {
					  throw new Error('La solicitud no fue exitosa');
					}
				
					// Analizar la respuesta como JSON y devolver los datos
					const contacts = await response.json();
					setStore({contacts});
				  } catch (error) {
					// Manejar errores
					console.error('Error al obtener los datos:', error.message);
					throw error;
				  }
			},

			addContacts: async(newContact)=>{
				
				try {
					// Realizar la solicitud Post usando 
					
		 		 	const requestOptions = {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
					 'Accept' : 'application/json',
					},
					body: JSON.stringify(newContact), // Convertimos el objeto a JSON y lo enviamos como cuerpo de la solicitud
		  			};
		 		 	const response = await fetch( "https://playground.4geeks.com/apis/fake/contact/",requestOptions);
					
					// Verificar si la respuesta está en el rango de 200-299 (éxito)
					if (!response.ok) {
					  throw new Error('La solicitud no fue exitosa');
					}
					else{
					// Analizar la respuesta como JSON y devolver los datos
					const contacts = getActions().getContacts();
					setStore({contacts});
					}

				  } catch (error) {
					// Manejar errores
					console.error('Error al obtener los datos:', error.message);
					throw error;
				  }
			},
			
			editContacts: async(editContact,id)=>{
				try {
					// Realizar la solicitud POST usando fetch
					const requestOptions = {
					  method: 'PUT',
					  body : JSON.stringify(editContact),
					  headers: {
						'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
					  },
					};
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`,requestOptions);
					// Verificar si la respuesta está en el rango de 200-299 (éxito)
					if (!response.ok) {
					  throw new Error('La solicitud no fue exitosa');
					}
					else{
					// Analizar la respuesta como JSON y devolver los datos
					const contacts = getActions().getContacts();
					setStore({contacts});
					}

				  } catch (error) {
					// Manejar errores
					console.error('Error al obtener los datos:', error.message);
					throw error;
				  }
			},

			deleteContacts: async(id)=>{
				try {
					// Realizar la solicitud POST usando fetch
					const requestOptions = {
					  method: 'DELETE',
					  headers: {
						'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
					  },
					};
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`,requestOptions);
					// Verificar si la respuesta está en el rango de 200-299 (éxito)
					if (!response.ok) {
					  throw new Error('La solicitud no fue exitosa');
					}
					else{
					// Analizar la respuesta como JSON y devolver los datos
					const contacts = getActions().getContacts();
					setStore({contacts});
					}

				  } catch (error) {
					// Manejar errores
					console.error('Error al obtener los datos:', error.message);
					throw error;
				  }
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
