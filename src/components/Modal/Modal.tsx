import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCreateTaskMutation } from '../../api/apiSlice';

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  categories: Category[];
}

const Modal = ({ open, handleClose, categories }: ModalProps) => {
  const [categorieSelected, setCategorieSelected] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createTask] = useCreateTaskMutation();
  const [titleError, setTitleError] = useState(false);
  const [categorieError, setCategorieError] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setCategorieSelected(event.target.value as string);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setCategorieError(false);

    if (title === '') {
      setTitleError(true);
    }
    if (categorieSelected === '') {
      setCategorieError(true);
    }

    if (title && categorieSelected) {
      createTask({
        title,
        description,
        category_id: categorieSelected,
      })
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Tarea</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 400 }}>
          <TextField
            name='title'
            margin='dense'
            id='title'
            label='Titulo'
            fullWidth
            variant='standard'
            required
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            inputProps={{ maxLength: 40 }}
          />
          <TextField
            name='description'
            margin='dense'
            id='description'
            label='Descripción'
            fullWidth
            variant='standard'
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 100 }}
          />
          <FormControl variant='standard' sx={{ marginTop: 1, width: '100%' }}>
            <InputLabel id='demo-simple-select-standard-label'>Categoria</InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              value={categorieSelected}
              label='Age'
              name='category_id'
              onChange={handleChange}
              error={categorieError}>
              {categories &&
                categories.map((category: Category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'
            style={{
              width: 120,
            }}>
            Cancelar
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit}
            variant='contained'
            style={{
              width: 120,
            }}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default Modal;
