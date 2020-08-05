import React from 'react';
//import Button from '@material-ui/core/Button';
//import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import { signIn,signOut } from '../actions';



class GoogleAuth extends React.Component{

	//state={isSignedIn:null};

	componentDidMount(){
		window.gapi.load('client:auth2',()=>{
			window.gapi.client.init({
				clientId:'192133408573-nv34i2186vhebpqmo8f54fici4k48jeg.apps.googleusercontent.com',
				scope:'email'
			}).then(()=>{
				this.auth=window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				//this.setState({isSignedIn:this.auth.isSignedIn.get()});
				this.auth.isSignedIn.listen(this.onAuthChange);
				//listen is a callback function that will update the status of user immediately .. listen resides inside signinfunction

			});
		});
	}

	onAuthChange=(isSignedIn)=>{
		if(isSignedIn){
			this.props.signIn(this.auth.currentUser.get().getId());
		}
		else{
			this.props.signOut();
		}
		//this.setState({isSignedIn:this.auth.isSignedIn.get()});
	}

	onSignInClick=()=>{
		this.auth.signIn();
	}
	onSignOutClick=()=>{
		this.auth.signOut();
	}
	
	renderAuthButton(){
		if (this.props.isSignedIn === null){
			//console.log('I dont know if i am sigend in');
			return null;
		}
		else if(this.props.isSignedIn){
			//console.log('I am signed in');
			return (
			<button className="ui red google button" onClick={this.onSignOutClick}>
			<i className="google icon" />
			Signout
			</button>
			);
		}
		else{
			return (
			<button className="ui red google button" onClick={this.onSignInClick}>
			<i className="google icon" />
			Sign In 
			</button>
			);
		}
	}

	render()
	{
		return <div>{this.renderAuthButton()}</div>;

	}

}

const mapStateToProps=(state)=>{
	return {isSignedIn:state.auth.isSignedIn};

};


export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);


// with react only

// class GoogleAuth extends React.Component{

// 	state={isSignedIn:null};

// 	componentDidMount(){
// 		window.gapi.load('client:auth2',()=>{
// 			window.gapi.client.init({
// 				clientId:'192133408573-nv34i2186vhebpqmo8f54fici4k48jeg.apps.googleusercontent.com',
// 				scope:'email'
// 			}).then(()=>{
// 				this.auth=window.gapi.auth2.getAuthInstance();
// 				this.setState({isSignedIn:this.auth.isSignedIn.get()});
// 				this.auth.isSignedIn.listen(this.onAuthChange);
// 				//listen is a callback function that will update the status of user immediately .. listen resides inside signinfunction

// 			});
// 		});
// 	}

// 	onAuthChange=()=>{
// 		this.setState({isSignedIn:this.auth.isSignedIn.get()});
// 	}

// 	onSignInClick=()=>{
// 		this.auth.signIn();
// 	}
// 	onSignOutClick=()=>{
// 		this.auth.signOut();
// 	}
	
// 	renderAuthButton(){
// 		if (this.state.isSignedIn === null){
// 			//console.log('I dont know if i am sigend in');
// 			return null;
// 		}
// 		else if(this.state.isSignedIn){
// 			//console.log('I am signed in');
// 			return (
// 			<button className="ui red google button" onClick={this.onSignOutClick}>
// 			<i className="google icon" />
// 			Signout
// 			</button>
// 			);
// 		}
// 		else{
// 			return (
// 			<button className="ui red google button" onClick={this.onSignInClick}>
// 			<i className="google icon" />
// 			Sign In 
// 			</button>
// 			);
// 		}
// 	}

// 	render()
// 	{
// 		return <div>{this.renderAuthButton()}</div>;

// 	}

// }

// export default connect(null,{signIn,signOut})(GoogleAuth);