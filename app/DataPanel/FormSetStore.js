//Store File for FormSetStore
import { autorun, observable, computed} from 'mobx';
class FormSetStore{
@observable map = {"device":"0","xValue":"0","yValue":"0","status":"0"}
reset(){this.map=this.map.map(e=>{return 0})}changeValue(value,param){this.map[param]=value;}
@computed get formset(){

const formList = [
    {
        "type": "select",
        "dispLabel": "Device",
        "param": "device",
        "list": [
            {
                "dispLabel": "Device1",
                "id": "M"
            },
            {
                "dispLabel": "Device2",
                "id": "H"
            },
            {
                "dispLabel": "Device3",
                "id": "L"
            },
            {
                "dispLabel": "Device4",
                "id": "Z"
            }
        ],
        "trigger": "changeValue",
        "value": "0"
    },
    {
        "type": "text",
        "dispLabel": "X value",
        "param": "xValue",
        "trigger": "changeValue",
        "value": "0"
    },
    {
        "type": "text",
        "dispLabel": "Y value",
        "param": "yValue",
        "trigger": "changeValue",
        "value": "0"
    },
    {
        "type": "select",
        "dispLabel": "Status",
        "param": "status",
        "list": [
            {
                "dispLabel": "A",
                "id": "A"
            },
            {
                "dispLabel": "NA",
                "id": "NA"
            }
        ],
        "trigger": "changeValue",
        "value": "0"
    }
]
const actionList = undefined
return {                formList: formList,                actionList: actionList,                className: ' formset2 whiteBgColor',                columns: 1            }
}
}var store = window.store = new FormSetStore;export default store