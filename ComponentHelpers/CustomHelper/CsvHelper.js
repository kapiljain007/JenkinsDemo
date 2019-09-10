const csv = require('fast-csv');
const fs = require()

const CsvHelper = function() {

    this.validateExportedContents = async function(targetName, targetPath, targetValue) {
        var stream = fs.createReadStream(targetPath);
    csv
    .fromStream(stream, {headers : true})
    .validate(function(data){
     return data[targetName] == targetValue;
    })
    .on("data-invalid", function(data){
     fail('Contents were not exported properly.')
    })
    }
}