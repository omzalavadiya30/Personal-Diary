import Swal from "sweetalert2";

const validateSignUp = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.name === "") {
    Swal.fire({
      icon: "error",
      title: "Please enter your full name",
      ConfirmButtonText: "OK",
    });
    return false;
  } else if (data.email === "") {
    Swal.fire({
      icon: "error",
      title: "Please enter your email",
      ConfirmButtonText: "OK",
    });
    return false;
  } else if (!emailRegex.test(data.email)) {
    Swal.fire({
      icon: "error",
      title: "Please enter a valid email",
      confirmButtonText: "OK",
    });
    return false;
  } else if (data.password === "") {
    Swal.fire({
      icon: "error",
      title: "Please enter your password",
      ConfirmButtonText: "OK",
    });
    return false;
  } else if (data.confirmPassword === "") {
    Swal.fire({
      icon: "error",
      title: "Please confirm your password",
      ConfirmButtonText: "OK",
    });
    return false;
  } else if (data.password !== data.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
      ConfirmButtonText: "OK",
    });
    return false;
  }
  return true;
};
export default validateSignUp;

