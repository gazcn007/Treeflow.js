const fs = require('fs');
const fsPath = require('fs-path')

/*
 @ storeName -> just str.concat(panel,'Store.js')
 @ stores -> stores to be generated
 @ pageDirectory -> stores associated page's directory, which the store files will be saved in as well
 @ callback -> callback function
 */

module.exports = function(storeName, panel, pageDirectory){

    fsPath.writeFile(StoreFileDir(pageDirectory,storeName), '//Store File for '+storeName, function(err,data){
        if (err) throw err;
        console.log('Store File Created');

        var ws = fs.createWriteStream(StoreFileDir(pageDirectory,storeName), {flags:'a'});
        ws.writeLine=(str)=>{ws.write('\n');ws.write(str);};
        ws.writeLine(StoreFileDependencies);
        ws.writeLine(ClassName(storeName));

        // map user inputed values
        if(panel.store) {
            ws.writeLine("@observable map = " + JSON.stringify(panel.store));
        } else {
            console.log ('Store is missing on panel'+storeName);
            throw err;
        }

        //write
        ws.writeLine(BasicFunctions);
        if (panel.type.toLowerCase() == 'formset'){
            ws.writeLine("@computed get formset(){\n");
            if(panel.formList){
                panel.formList.forEach(e=>{
                    e.trigger = 'changeValue';
                    e.value = panel.store[e.param] ? panel.store[e.param] : 0;
                })
                ws.writeLine("const formList = "+JSON.stringify(panel.formList, null, 4)+"\n");
            } else {
                console.log ("FormList is missing on a formset panel");
                throw err;
            }
            if(panel.actionList){
                ws.writeLine("const actionList = "+JSON.stringify(panel.actionlist, null, 4));
            } else {
                console.log ("FormList is missing on a formset panel");
                throw err;
            }

            ws.writeLine("return {\
                formList: formList,\
                actionList: actionList,\
                className: ' formset2 whiteBgColor',\
                columns: 1\
            }")
            ws.writeLine("}")
        } else if (panel.type.toLowerCase()  == 'fixtable') {
            
        } 
        ws.writeLine(ClassFooter(storeName));
    });
    
}

const StoreFileDir = (pageDirectory,storeName) => {return pageDirectory+'/'+storeName+'.js'};
const ClassName = (storeName) => {return "class "+storeName+"{"};
const ClassFooter = (storeName) => {return "}\
var store = window.store = new " + storeName +";\
export default store"
}
const StoreFileDependencies = "import { autorun, observable, computed} from 'mobx';"

const BasicFunctions = "reset(){this.array1=this.array1.map(e=>{return 0})}\
changeValue(value,param){this.array1[param]=value;}"