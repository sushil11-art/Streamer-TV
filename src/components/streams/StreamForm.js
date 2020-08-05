import React from 'react';
import {Field,reduxForm} from 'redux-form';
//import {connect} from 'react-redux';
//import {createStream} from '../../actions';


class StreamForm extends React.Component{
	// renderInput(formProps)
	// {
	// 	console.log(formProps);
	// 	//return <input onChange={formProps.input.onChange} value={formProps.input.value} />

	// 	return <input {...formProps.input} />;
	// }

	renderError({error,touched}){
		if(touched && error){
			return (
				<div className="ui error message">
				<div className="header">{error}</div>
				</div>
			);
		}

	}
	renderInput=({ input, label,meta })=>{
		console.log(meta);

		const className=`field ${meta.error && meta.touched ? 'error' : ''}`;
		//label is accepted by passing as a props from <Field>
		//we defined helper method to show the error
		return (
			<div className={className}>
			<label>{label}</label>
			<input {...input} autoComplete="off" />
			{this.renderError(meta)}
			</div>
		);
	}
	onSubmit=(formValues)=>{

		//console.log(formValues);
		this.props.onSubmit(formValues);
	}

	render(){
		//console.log(this.props);
	return (
		// handleSubmit is a function that is inside redux form that  is called with a callback when form gets submmited
		<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
		<Field name="title" component={this.renderInput} label="Enter title" />
		<Field name="description" component={this.renderInput} label="Enter description" />
		<button className="ui button primary">Submit</button>
		</form>

		);
}
}

// title and description is the name of the feild

const validate=(formValues)=>{
	
	const errors={};
	if(!formValues.title){
		errors.title='You have not entered a title';
	}
	if(!formValues.description){
		errors.description='You have not entered a description';
	}
	return errors;

}
//now the form errors is passed to renderInput function and we accept them as name meta


export default reduxForm({form:'streamForm',validate:validate})(StreamForm);

