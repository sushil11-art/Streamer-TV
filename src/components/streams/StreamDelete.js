import React from 'react';

import Modal from '../Modal';
import history from '../../history';

import {connect} from 'react-redux';
import {fetchStream,deleteStream} from '../../actions';

import {Link} from 'react-router-dom';



class StreamDelete extends React.Component{

	componentDidMount(){
		console.log(this.props);
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions(){
		//const {id}=this.props.match.params;
	return (
		<React.Fragment>
		<button className="ui button negative" onClick={()=>this.props.deleteStream(this.props.match.params.id)}>Delete</button>
		<Link to="/" className="ui button ">Cancel</Link>
		</React.Fragment>		
	);
}
renderContent(){
	if(!this.props.stream){
		return 'Are you sure want to delete the stream ?'
	}

	return `Are you sure want to delete the stream with title: ${this.props.stream.title} ?`
}

render(){
	return (
		<Modal title="Delete Stream" 
		content={this.renderContent()}
		 actions={this.renderActions()} 
		 onDismiss={()=>{history.push('/')}} />
		
	);
}
}
const mapStateToProps=(state,ownProps)=>{
	return {stream:state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);