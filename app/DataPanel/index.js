// Root File for Page Data Panel
import React from 'react';import {inject, observer} from 'mobx-react';import {Panel, FormSet, NavBar} from 'Components';import io from 'socket.io-client';
@inject("FormSetStore")
@observer
export default class DataPanel extends React.Component {
render(){const FormSetStore_formset = this.props.FormSetStore.formset;
const FormSetStoreConfig = {                        reset: this.props.FormSetStore.reset.bind(this.props.FormSetStore),                        changeValue: this.props.FormSetStore.changeValue.bind(this.props.FormSetStore)                    }
return (<Panel title = "FormSet">                        <FormSet {...FormSetStore_formset} {...FormSetStoreConfig } />                    </Panel>)
}
};