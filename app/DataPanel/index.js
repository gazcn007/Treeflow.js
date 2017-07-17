// Root File for Page Data Panel
import React from 'react';import {inject, observer} from 'mobx-react';import {Panel, FormSet} from 'Components';import io from 'socket.io-client';
@inject("FormSetStore")
@observer
export default class DataPanel extends React.Component {
render(){const {FormSetStore_formset} = this.props.FormSetStore;
const FormSetStoreConfig = {                        reset: this.props.FormSetStore.reset.bind(this.props.FormSetStore),                        changeValue: this.props.FormSetStore.changeValue.bind(this.props.FormSetStore),                        addData: this.addData.bind(this)                    }
return (<Panel title = "FormSet">                        <FormSet {...FormSetStore_formset} {...FormSetStoreConfig } />                    </Panel>)
}
};