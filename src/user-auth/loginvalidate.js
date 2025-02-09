import Swal from "sweetalert2";

const validateLogin = (data) => {
    if (data.email === "") {
      Swal.fire({
        icon: "error",
        title: "Please enter your email",
        ConfirmButtonText: "OK",
      });
      return false;
    }else if (data.password === "") {
      Swal.fire({
        icon: "error",
        title: "Please enter your password",
        ConfirmButtonText: "OK",
      });
      return false;
    }
    return true;
  };
export default validateLogin;