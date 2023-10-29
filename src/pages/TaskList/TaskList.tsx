import { Button, List, Typography } from '@mui/material';
import ListItemModified, { Task } from '../../components/ListItem/ListItem';
import AddIcon from '@mui/icons-material/Add';
import { useGetCategoriesQuery, useGetTasksQuery, useUpdateTaskMutation } from '../../api/apiSlice';
import { useCallback, useState } from 'react';
import Modal from '../../components/Modal/Modal';

const TaskList = () => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const { data: tasks, isLoading: isLoadingTasks, isError: isErrorTasks } = useGetTasksQuery({});
  const { data: categories } = useGetCategoriesQuery({});
  const [updateTask] = useUpdateTaskMutation();

  const handleClickOpenModal = () => {
    setOpenFormModal(true);
  };

  const handleCloseModal = () => {
    setOpenFormModal(false);
  };

  const findTasksEnd = useCallback(() => {
    if (tasks) {
      const tasksEnd = tasks.filter((task: Task) => task.completed);
      return tasksEnd;
    }
  }, [tasks]);

  const findTasksNotEnd = useCallback(() => {
    if (tasks) {
      const tasksEnd = tasks.filter((task: Task) => !task.completed);
      return tasksEnd;
    }
  }, [tasks]);

  if (isLoadingTasks) return <div>Loading...</div>;
  else if (isErrorTasks) return <div>Ocurrio un error!</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 10, marginTop: 50, marginLeft: 20 }}>
        <Typography variant='h3' style={{ marginBottom: 30 }}>
          Lista de Tareas
        </Typography>
        <Typography variant='h6'>Pendientes</Typography>
        <List
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '70%',
          }}>
          {(findTasksNotEnd() ?? []).map((task: Task) => (
            <ListItemModified
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              category_id={task.category_id}
              categories={categories}
              update={updateTask}
            />
          ))}
        </List>
        <Typography variant='h6'>Terminadas</Typography>
        <List
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '70%',
          }}>
          {(findTasksEnd() ?? []).map((task: Task) => (
            <ListItemModified
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              category_id={task.category_id}
              categories={categories}
              update={updateTask}
            />
          ))}
        </List>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '70%',
        }}>
        <Button
          onClick={handleClickOpenModal}
          style={{
            background: '#2196F3',
            width: 25,
            height: 60,
            padding: 0,
            borderRadius: 30,
          }}>
          <AddIcon
            fontSize='small'
            sx={{
              color: 'white',
            }}
          />
        </Button>
        <Modal open={openFormModal} handleClose={handleCloseModal} categories={categories} />
      </div>
    </div>
  );
};

export default TaskList;
