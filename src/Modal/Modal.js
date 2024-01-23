import ReactDOM from "react-dom";

const portalElement = document.getElementById("portal");

const Modal = ({ children }) => {
  return ReactDOM.createPortal(children, portalElement);
};

export default Modal;
