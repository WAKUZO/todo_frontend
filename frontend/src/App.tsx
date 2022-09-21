import React, { useState, useEffect } from "react";
import Todo from "./component/Todo";
import {
  Flex,
  Center,
  Box,
  CheckboxGroup,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { TodoType } from "./types/index"
import axios from "axios";

const App = () => {

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState<string>("");

  // const getTodos = () => {
  //   axios
  //     .get("http://localhost:3001/api/todos")
  //     .then(res => {
  //       // 2回呼ばれてしまう
  //       console.log(res.data); 
  //       const todoData = res.data;
  //       setTodos(todoData);
  //     })
  //     .catch((err) => {
  //       window.alert(err.message)
  //     });
  // };

  // const createTodo = () => {
  //   axios
  //     .post("http://localhost:3001/api/todos", {
  //       title: title,
  //       is_done: false,
  //     });
  //     setTitle("");
  //     getTodos();
  // };

  // todo_backendのapiでgetリクエストを送りタスクの一覧取得
  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/todos");
      setTodos(res.data);
      console.log(res.data); 
    } catch (error: any) {
      window.alert(error.message)
    }
  };

  // todo_backendのapiのpostリクエストを送りタスクを保存
  const createTodo = async () => {
    try {
      await axios.post("http://localhost:3001/api/todos", {
        title: title,
        is_done: false,
      });
      setTitle("");
      getTodos();
    } catch (error: any) {
      // window.alert(error.message)
      if (error.response.status == 500) {
        window.alert('500エラー:Todoの作成に失敗しました')
      }
    }
  };

  // タスクの削除する関数
  const destroyTodo = async (id: TodoType) => {
    await axios.delete(`http://localhost:3001/api/todos/${id}`);
    getTodos();
  };

  
  // 第２引数に[]を指定することで初回レンダリング時にのみaxiosでgetを叩いている
  useEffect(() => {
    getTodos();
  }, []);
  

  // タスクの完了・未完了を更新する関数
  const toggleIsDone = async (id: TodoType, index: number) => {
    const isDone = todos[index].is_done;
    console.log(todos[index]);
    console.log(isDone);

    await axios.put(`http://localhost:3001/api/todos/${id}`, {
      is_done: !isDone,
    });
    getTodos();
  };

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              今日のタスク
            </Text>
          </Box>
          {/* // todo: TaskFormコンポーネント的にわける */}
          <Flex mb="24px">
            <Input
              placeholder="タスク名を入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTodo}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
          {/* // TaskFormコンポーネント的にわける */}
          <CheckboxGroup>
            {todos.map((todo: TodoType, index: number) => {
              return (
                <Todo
                  id={todo.id}
                  key={index}
                  index={index}
                  title={todo.title}
                  isDone={todo.isDone}
                  toggleIsDone={toggleIsDone}
                  destroyTodo={destroyTodo}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};

export default App;