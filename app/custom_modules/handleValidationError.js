//==============error mesage =============//
const handleValidationError = async (error) => {
	let errors = {};
	if (error.name == "MongoServerError" && error.code == 11000) {
	    Object.keys(error.keyPattern).forEach((key) => {
			errors[key] = `${key} already taken!`;
		});
	}
    if (error.name === "ValidationError") {
		Object.keys(error.errors).forEach((key) => {
			errors[key] = error.errors[key].message;
		});
		return errors;
	}
	return errors;
}
module.exports = handleValidationError;