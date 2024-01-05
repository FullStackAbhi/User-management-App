import PropTypes from "prop-types";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import SingleUser from "../SingleUser";
import ConfirmationDialog from "../Modal";
import { useUsers } from "../UserContext";

const UsersList = () => {
  const allUsers = useUsers();

  const [showModal, setShowModal] = useState(false);
  const [op, setOp] = useState("edit");
  const [userToOperate, setUserToOperate] = useState({});

  const handleUserOperations = (userId, op) => {
    const user = allUsers.find((usr) => usr.id === userId);
    setUserToOperate(user);
    setOp(op);
    setShowModal(true);
  };
  return (
    <Container>
      <ListGroup>
        {allUsers.map((user) => (
          <SingleUser
            key={user.id}
            user={user}
            handleUser={handleUserOperations}
          />
        ))}
      </ListGroup>
      <ConfirmationDialog
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        user={userToOperate}
        operation={op}
      />
    </Container>
  );
};

UsersList.propTypes = {
  allUsers: PropTypes.shape([]),
  handleOperation: PropTypes.func,
};

export default UsersList;
