'use strict';
const fs = require('fs');

const buildTreeData = require('./buildTreeData');
const buildReportHTML = require('./buildReportHTML');


module.exports = function (bundler) {
  // Temporarily skipping arg check until Ive resolved https://github.com/gregtillbrook/parcel-plugin-bundle-visualiser/issues/6
  // const argv = require('yargs').argv;
  // const isBundleReportEnabled = argv.visualise || argv.visualize;
  const isBundleReportEnabled = true;

  if(isBundleReportEnabled){
    bundler.on('bundled', mainBundle=>{
      const treeData = buildTreeData(mainBundle);
      const report = buildReportHTML(treeData);
      saveReport('report.html', report);
    });
  }

};

function saveReport(fileName, fileContent){
  fs.writeFile(fileName, fileContent, function(err) {
    if(err) { 
      return console.error(err);
    }else{
      console.log(`Bundle breakdown saved in report: ${fileName}`); // eslint-disable-line no-console
    }
  });
}