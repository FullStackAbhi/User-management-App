import { createContext, useContext, useReducer } from "react";
import UserData from "../../assets/Users.json";
import PropTypes from "prop-types";

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [allUsers, dispatch] = useReducer(UsersReducer, UserData);

  return (
    <UserContext.Provider value={allUsers}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUsers() {
  return useContext(UserContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

function UsersReducer(allUsers, action) {
  switch (action.type) {
    case "deleted": {
      return allUsers.filter((user) => user.id !== action.user.id);
    }
    case "save": {
      if (action.user.edit) {
        const editeduser = allUsers.map((user) => {
          if (user.id == action.user.id) {
            return {
              ...action.user,
              edit: false,
            };
          } else {
            return user;
          }
        });
        return editeduser;
      } else {
        return [
          ...allUsers,
          { ...action.user, id: allUsers[allUsers.length - 1].id + 1 },
        ];
      }
    }
    case "edit": {
      const editeduser = allUsers.map((user) => {
        if (user.edit == true) {
          return {
            ...user,
            edit: false,
          };
        }
        if (user.id == action.id) {
          return {
            ...user,
            edit: true,
          };
        } else {
          return user;
        }
      });
      return editeduser;
    }
    case "reset": {
      const editeduser = allUsers.map((user) => {
        if (user.id == action.id) {
          return {
            ...user,
            edit: false,
          };
        } else {
          return user;
        }
      });
      return editeduser;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

UsersProvider.propTypes = {
  children: PropTypes.array,
};
