import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TableComponent from "./Table";

export type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number>();
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3030/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users]);
  function handleClickCreate(e: React.FormEvent) {
    e.preventDefault();
    axios
      .post("http://localhost:3030/user", { name, email })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setName("");
    setEmail("");
  }
  function handleClickUpdate() {
    axios
      .put(`http://localhost:3030/user/${userId}`, { name, email })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setIsUpdateClick(false);
    setName("");
    setEmail("");
    setUserId(undefined);
  }
  function deleteUser(id: number) {
    axios
      .delete(`http://localhost:3030/user/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  function updateUser(id: number, userName: string, userEmail: string) {
    setName(userName);
    setEmail(userEmail);
    setUserId(id);
    setIsUpdateClick(true);
  }

  return (
    <Flex h="100vh" direction="column" align="center" justify="center">
      <Stack spacing={10}>
        <Text fontSize="3xl">
          Consumindo Api de Usuários feita com Prisma+Express
        </Text>
        <TableComponent
          users={users}
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
        <Center>
          <FormControl>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {!isUpdateClick ? (
              <Button colorScheme="blue" onClick={handleClickCreate}>
                Novo Usuário
              </Button>
            ) : (
              <Button colorScheme="green" onClick={handleClickUpdate}>
                Alterar Usuário
              </Button>
            )}
          </FormControl>
        </Center>
      </Stack>
    </Flex>
  );
}

export default App;
