import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')

  return (
    <UserContext.Provider
      value={{
        nickname,
        setNickname,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        age,
        setAge,
        weight,
        setWeight
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
