var fsPath = require('fs-path');
var fs = require('fs');
var storeGenerator = require('./StoreGenerator.js');

module.exports = function (pages, path) {
    var storeNames = []
    /*saves Store Names*/
    var storeDirectories = []
    /*saves Store Names*/
    var pageNames = []
    /*saves Page names */
    pages.map(page=> {
        var panelViews = []
        /*saves code block for static jsx panel view*/
        var panelStoreConnectors = []
        /*saves connectors code block in React component to the stores*/
        if (page.name) {
            pageNames.push(page.name);
            // dive into the panels first, because you need to know the list of stores needed for your panels
            // so you need to generate data layers files before writing to index.js, the main page
            // also within this mapping function, the static view code block has to be generated, so that it just need to be appened later on
            page.panels.map((panel, idx)=> {
                var storeName = StoreFileName(panel.type);
                storeNames.push(storeName);
                storeDirectories.push(PageDirectory(page.name, path) + '/' + storeName);
                storeGenerator(storeName, panel, PageDirectory(page.name, path)); //@ todo future problem with too many files with the same name?
                if (panel.type.toLowerCase() == 'formset') {
                    panelStoreConnectors.push("const {" + storeName + "_formset} = this.props." + storeName + ";\nconst " + storeName + "Config = {\
                        reset: this.props." + storeName + ".reset.bind(this.props." + storeName + "),\
                        changeValue: this.props." + storeName + ".changeValue.bind(this.props." + storeName + "),\
                        addData: this.addData.bind(this)\
                    }");
                    panelViews.push("<Panel title = \"" + panel.type + "\">\
                        <FormSet {..." + storeName + "_formset} {..." + storeName + "Config } />\
                    </Panel>");
                }
            });

            //After knowing the store, generate page file in ES6 and React
            fsPath.writeFile(RootFileName(page.name, path), '// Root File for Page ' + page.name, function (err, data) {
                if (err) throw err;
                console.log('Root File Created for Page : ' + page.name);

                // Create a write stream, and add in the writeLine() method
                var ws = fs.createWriteStream(RootFileName(page.name, path), {flags: 'a'})
                ws.writeLine = (str)=> {
                    ws.write('\n');
                    ws.write(str);
                };
                ws.writeLine(RootFileDependencies);
                ws.writeLine(StoreInjection(storeNames))
                ws.writeLine(ClassHeader(page.name.replace(" ", "")));
                ws.writeLine("render(){" + panelStoreConnectors[0]);
                ws.writeLine("return (" + panelViews[0] + ")");
                ws.writeLine(ClassFooter);
            });
        } else {
            throw 'Page Name Missing';
        }
    });
    // Create main.js , the router and main entrance of the app
    fsPath.writeFile(path + '/Main.js', '// Root File for The Tree Flow app', function (err, data) {
        if (err) throw err;
        console.log('Tree Flow Application Entrance Created');
        var ws = fs.createWriteStream(path + '/Main.js', {flags: 'a'})
        ws.writeLine = (str)=> {
            ws.write('\n');
            ws.write(str);
        };
        ws.writeLine(MainFileDependencies);
    });
}
// Static Asset for Code Generation utils for Pages
const PageDirectory = (pageName, path) => {return path+'/'+pageName.replace(/\s/g, '')};
const StoreFileName = (panelName) => {return panelName+'Store'};
const RootFileName = (pageName,path) => {return PageDirectory(pageName,path)+'/index.js'};
const RootFileDependencies = "import React from 'react';\
import {inject, observer} from 'mobx-react';\
import {Panel, FormSet} from 'Components';\
import io from 'socket.io-client';"
const StoreInjection = (storeNames) => {
    return "@inject(\""+storeNames.map(e=>e+'').toString()+"\")\n@observer"
};
const ClassHeader = (pageName) => {return "export default class "+pageName+" extends React.Component {"};
const ClassFooter = "}\n};"

// Static Asset for Code Generation utils For Main.js
const MainFileDependencies = "import React from 'react';\
import ReactDOM from 'react-dom';\
import createBrowserHistory from 'history/createBrowserHistory';\
import { Provider } from 'mobx-react';\
import { BrowserRouter as Router, Route , hashHistory} from 'react-router-dom';\
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';"