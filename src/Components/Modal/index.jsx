import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUserDispatch } from "../UserContext";

const ConfirmationDialog = ({ user, operation, showModal, handleClose }) => {
  const dispatch = useUserDispatch();
  const op = operation === "delete" ? "Delete" : "Edit";

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {op}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you Sure you want to{" "}
        <span className="fw-bold">
          {op} {user.firstName}
        </span>{" "}
        with email : <span className="fw-bold">{user.email}</span> and phone :{" "}
        <span className="fw-bold">{user.phone}</span> ?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            {
              op === "Delete"
                ? (handleClose(),
                  dispatch({
                    type: "deleted",
                    user: user,
                  }))
                : (handleClose(),
                  dispatch({
                    type: "edit",
                    id: user.id,
                  }));
            }
          }}
        >
          {op}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  user: PropTypes.object,
  operation: PropTypes.oneOf(["delete", "edit"]),
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
};

export default ConfirmationDialog;
