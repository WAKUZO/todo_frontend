import { Checkbox, Text, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// interface Props {

// }

const Todo = (props) => {

  const {id, index, title, isDone, toggleIsDone, destroyTodo} = props;

  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox
        colorScheme="red"
        size="lg"
        isChecked={isDone}
        onChange={() => toggleIsDone(id, index)}
        >
        <Text>{title}</Text>
      </Checkbox>
      <CloseIcon onClick={() => destroyTodo(id)} />
    </Flex>
  );
};

export default Todo;