import React from 'react';
import {connect} from 'react-redux';
import {fetchStream,editStream} from '../../actions';
import StreamForm from './StreamForm';

import _ from 'lodash';


class StreamEdit extends React.Component{
		componentDidMount(){
			//this.props.match.params.id is a props that came from route edit/:id
			this.props.fetchStream(this.props.match.params.id);
		}
		onSubmit=(formValues)=>{
			console.log(formValues);
			this.props.editStream(this.props.match.params.id,formValues);
		}

	render()
	{
		//console.log(this.props);
		if (!this.props.stream)
		{
			return <div>Loading...</div>;
		}
	return (
			<div>
			<h3>Edit Stream </h3>
			<StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream,'title','description')} />
			</div>

	);
}

}

const mapStateToProps=(state,ownProps)=>{
	//console.log(props);
	return {stream:state.streams[ownProps.match.params.id]};
};
export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);