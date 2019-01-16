# node-objects-database
Simple module to work with saving/searching/deleting any objects using embed nosql file database, for small projects.

NOTE: Multiple types of objects can be stored in a single database file with different key names, if needed.

Usage:

var objectsDb = require("node-objects-storage");<br/>
objectsDb.start("<database_file_name>"); // .nosql will be appended automatically. Use multiple instances for multiple file databases OR use different keys for different kinds of objects.

objectsDb.set("productId", {productId: "key_5678", name: "A good product", description: "This is a good product."}); // creates an object in the file database and updates it if already exists.

objectsDb.get("productId", "key_5678"); // get object by key

objectsDb.insert("productId", {productId: "key_5679", name: "Another good product", description: "This is another good product."}); // inserts new object, if the key already exists it will be ignored.

objectsDb.update("productId", {productId: "key_5679", name: "Another good product", description: "This is another good product.", weight: "1.2 kg"}); // updates an existing object, ignores if not already added.

objectsDb.remove("productId", "key_5678"); // searches by key and removes the object, ignores if not found

objectsDb.find(); // gets all objects in the file database<br/>
objectsDb.find("productId", "key_5678"); // same as objectsDb.get("productId", "key_5678"); as it gets single object<br/>
objectsDb.find("productId"); // gets all objects which have the key name productId<br/>
objectsDb.find({name: "Another good product", weight: "1.2 kg"}); // searches multiple fields and gets all the related objects

objectsDb.count(); // gets count of all objects in the file database<br/>
objectsDb.count("productId") // gets count of objects with particular key only

objectsDb.clear(); // clears all objects from the file database

IMPORTANT: All the above methods are asynchronous, so you should use .then .catch to check if actions are done, for example:<br/>
objectsDb.set("productId", {productId: "key_5678", name: "A good product", description: "This is a good product."})<br/>
&nbsp;&nbsp;.then(function(response) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp; // object was saved.<br/>
&nbsp;&nbsp;})<br/>
&nbsp;&nbsp;.catch(function(error) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp; // error occured.<br/>
&nbsp;&nbsp;});

objectsDb.db(); // returns full nosql object to work with