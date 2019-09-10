const XLSX = require('xlsx');
var csv = require("fast-csv");
var fs = require('node-fs');

var Excel = function(){

this.readXlsx = function(FilePath,Array){
	const workbook = XLSX.readFile(FilePath);
    const sheet_name_list = workbook.SheetNames;
    Array = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
};

this.assertExportedCsv = function(name,path,header){
	var stream = fs.createReadStream(path);

	csv
	 .fromStream(stream, {headers : true})
	 .validate(function(data){
			 return data[header] == name;
	 })
	 .on("data-invalid", function(data){
			 fail('There is a mismatch in value B/W Exported data');
	 })
	 .on("data", function(data){
			 console.log(data);
	 })
	 .on("end", function(){
			 console.log("done");
	 });
}

}
module.exports = new Excel();
