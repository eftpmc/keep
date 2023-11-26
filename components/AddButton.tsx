type AddButtonProps = {
  onAdd: () => void;
};

export const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  return (
    <button onClick={onAdd}>
      Add Item
    </button>
  );
};

export default AddButton;
