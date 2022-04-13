import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { User } from "./App";

function TableComponent({
  users,
  deleteUser,
  updateUser,
}: {
  users: User[];
  deleteUser: (id: number) => void;
  updateUser: (id: number, name: string, email: string) => void;
}) {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>

              <Td>
                <Button colorScheme="red" onClick={() => deleteUser(user.id)}>
                  Deletar
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => updateUser(user.id, user.name, user.email)}
                >
                  Alterar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
