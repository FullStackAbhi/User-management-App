import UsersList from "../UsersList";
import UserForm from "../UserForm";
import { UsersProvider } from "../UserContext";

const UserManagement = () => {
  return (
    <UsersProvider>
      <UserForm />
      <UsersList />
    </UsersProvider>
  );
};

export default UserManagement;
