'use client'
import React, { useState } from 'react';

interface EditableCardProps {
  title?: string;
  body?: string;
  columns?: number;
  onDragStart?: (item: BoardItem) => void;
  onDelete?: () => void;
  boardTitle?: string;
}

interface BoardItem {
  id: number;
  title?: string;
  body?: string;
  columns?: number;
  boardTitle?: string;
}

const EditableCard: React.FC<EditableCardProps> = ({
  title: initialTitle,
  body: initialBody,
  columns = 1,
  onDragStart,
  onDelete,
  boardTitle,
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [body, setBody] = useState<string>(initialBody);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingBody, setIsEditingBody] = useState<boolean>(false);

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
  };

  const handleBodyDoubleClick = () => {
    setIsEditingBody(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleBodyBlur = () => {
    setIsEditingBody(false);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable={true}
      onDragStart={() => onDragStart?.({ title, body, columns, boardTitle })}
    >
      {isEditingTitle ? (
        <input type="text" value={title} onChange={handleTitleChange} onBlur={handleTitleBlur} />
      ) : (
        <div className="flex items-center justify-between w-full">
          <h2
            className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full"
            onDoubleClick={handleTitleDoubleClick}
          >
            {title}
          </h2>
          <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700">
            Удалить
          </button>
        </div>
      )}
      {isEditingBody ? (
        <textarea value={body} onChange={handleBodyChange} onBlur={handleBodyBlur} />
      ) : (
        <p className="mt-3 text-sm font-medium" onDoubleClick={handleBodyDoubleClick}>
          {body}
        </p>
      )}
    </div>
  );
};

export default EditableCard;
