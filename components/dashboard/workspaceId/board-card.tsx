interface BoardCardProps {
  boardId: string;
  imageUri: string;
  name: string;
}

const BoardCard = ({ boardId, imageUri, name }: BoardCardProps) => {
  return <div>BoardCard</div>;
};

export default BoardCard;
