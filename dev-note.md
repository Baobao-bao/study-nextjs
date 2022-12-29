if user come in the main page ("/"), redirect to an assign room

if user come in with a room id, 
  show the prompt, enter the password(if private), username 
  1. connect to the server, check if the room is full
     1. if it's full, disconnect and show the popup message which either guide to the lobby or create an new room
     2. if it's not full,  


user = {
  id: Number,
  color: String, 

  name: String, 
  gender: String,
  video
}