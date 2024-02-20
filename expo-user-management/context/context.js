import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [sex, setSex] = useState(0)
  const [athleteType, setAthleteType] = useState(0)
  const [experienceLevel, setExperienceLevel] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [groups, setGroups] = useState([])

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
        setWeight,
        sex,
        setSex,
        athleteType,
        setAthleteType,
        experienceLevel,
        setExperienceLevel,
        imageUrl,
        setImageUrl,
        groups,
        setGroups
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
