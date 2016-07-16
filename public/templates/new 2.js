db.folders.insert({ _id: ObjectId("56d9fad7a7db49f01aa14275"), padre: ObjectId("56d9e5a0596d323abeade7b3") ,nombre:"carpeta 1", files: [], carpetas:[ObjectId("56d9faf3a7db49f01aa14277"),			ObjectId("56d9faf6a7db49f01aa14278"),			ObjectId("56d9fafaa7db49f01aa14279"),			ObjectId("56d9fb00a7db49f01aa1427a"),			ObjectId("56d9fb05a7db49f01aa1427b"),			ObjectId("56d9fb0aa7db49f01aa1427c"),			ObjectId("56d9fb0fa7db49f01aa1427d")]})






nombre  = "Oscar"
nombre2 = "Ivan"

<p> Oscar</p>

#button1
#button2


$(#'button1').click(function(){
	$(body).append('<div>'+ nombre2 + '</div>')
})