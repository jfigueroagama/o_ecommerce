export const inputClasses = (fieldName, state) => {
	let classes = 'form-control';
	if (state.errors[fieldName]) {
		return `${classes} is-invalid`;
	}
	return classes;
};
