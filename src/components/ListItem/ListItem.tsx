import ListItem from '@mui/material/ListItem';
import { Checkbox, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Category } from '../Modal/Modal';

export interface Task {
  id: string;
  title: string;
  description: string;
  category_id: string;
  completed: boolean;
  categories: Category[];
  update: (taskUpdate: Partial<Task>) => void;
}

const getColorById = (category_id: string, categories: Category[]) => {
  const item = categories?.find((category: Category) => category.id === category_id);
  if (item) {
    return item.color;
  }
  return 'white';
};

const ListItemModified = ({ title, description, completed, category_id, id, categories, update }: Task) => {
  return (
    <ListItem
      key={id}
      style={{
        backgroundColor: getColorById(category_id, categories),
        padding: 0,
      }}>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            onChange={(e) => {
              e.target.checked;

              update({
                id,
                title,
                category_id,
                description,
                completed: e.target.checked,
              });
            }}
            edge='start'
            checked={completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={title} secondary={description} />
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemModified;
