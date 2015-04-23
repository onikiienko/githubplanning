var fs = require('fs');
var pkg = "./package.json";
var roomsNumber;

exports.getNumberOfRooms = function(){
	var pkgContent = fs.readFileSync(pkg, 'utf8');
	roomsNumber = parseInt(JSON.parse(pkgContent).numberOfRooms);
	return roomsNumber;
};

exports.incNumberOfRooms = function(){
	if(!roomsNumber) {
		this.getNumberOfRooms()
	}
	roomsNumber++;
	var pkgContent = fs.readFileSync(pkg, 'utf8');
	pkgContent = JSON.parse(pkgContent);
	pkgContent.numberOfRooms = roomsNumber;
	fs.writeFileSync(pkg, JSON.stringify(pkgContent));
};