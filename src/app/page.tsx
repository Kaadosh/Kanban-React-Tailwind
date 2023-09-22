'use client'
import React, { useState } from 'react';
import EditableCard from '../../components/EditableCard';


interface BoardItem {
  id: number;
  title?: string;
  body?: string;
  columns?: number;
  boardTitle?: number;
}

interface Board {
  id: number;
  title: string;
  items: BoardItem[];
}

const Home: React.FC = () => {
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentItem, setCurrentItem] = useState<BoardItem | null>(null);
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: 'Сделать',
      items: [
        { id: 1, title: 'Сходить в магазин', body: 'Купить продукты'},
        { id: 2, title: 'Использовать что-то', body: 'Применить инструменты' },
        { id: 3, title: 'Поиграть в игры', body: 'Сыграть в новую игру' },
      ],
    },
    {
      id: 2,
      title: 'В процессе',
      items: [
        { id: 4, title: 'Работа в офисе', body: 'Завершить задачи' },
        { id: 5, title: 'Написать отчет', body: 'Сформулировать результаты' },
        { id: 6, title: 'Подготовить презентацию', body: 'Собрать материалы' },
      ],
    },
    {
      id: 3,
      title: 'Готово',
      items: [
        { id: 7, title: 'Закончить проект', body: 'Подготовить отчет о проекте' },
        { id: 8, title: 'Отправить документы', body: 'Отправить по электронной почте' },
        { id: 9, title: 'Отдохнуть', body: 'Пойти в отпуск'},
      ],
    },
    {
      id: 4,
      title: 'На проверке',
      items: [
        { id: 10, title: 'Проверить задачи', body: 'Проверить на соответствие' },
        { id: 11, title: 'Подготовить отчет', body: 'Подготовить сводку' },
        { id: 12, title: 'Составить план', body: 'Составить план действий' },
      ],
    },
    {
      id: 5,
      title: 'В очереди',
      items: [
        { id: 13, title: 'Подготовить материалы', body: 'Собрать необходимые документы' },
        { id: 14, title: 'Сделать заметки', body: 'Записать ключевые идеи' },
        { id: 15, title: 'Провести исследование', body: 'Провести анализ данных' },
      ],
    },
    {
      id: 6,
      title: 'На рассмотрении',
      items: [
        { id: 16, title: 'Рассмотреть заявки', body: 'Проанализировать запросы' },
        { id: 17, title: 'Проанализировать данные', body: 'Сделать выводы' },
        { id: 18, title: 'Сделать решение', body: 'Принять окончательное решение' },
      ],
    },
    {
      id: 7,
      title: 'Ожидает оплату',
      items: [
        { id: 19, title: 'Отправить счет', body: 'Отправить клиенту счет на оплату' },
        { id: 20, title: 'Подготовить отчет о выполнении', body: 'Составить отчет о выполнении работ' },
        { id: 21, title: 'Подтвердить платеж', body: 'Подтвердить получение оплаты' },
      ],
    },
    {
      id: 8,
      title: 'Согласование',
      items: [
        { id: 22, title: 'Согласовать проект', body: 'Провести совещание и согласовать проект' },
        { id: 23, title: 'Обсудить условия', body: 'Провести переговоры и обсудить условия сделки' },
        { id: 24, title: 'Принять решение', body: 'Принять окончательное решение' },
      ],
    },
    {
      id: 9,
      title: 'Завершено',
      items: [
        { id: 25, title: 'Подписать договор', body: 'Завершить процесс подписания договора' },
        { id: 26, title: 'Отправить товар', body: 'Отправить заказанный товар клиенту' },
        { id: 27, title: 'Собрать отзывы', body: 'Собрать отзывы от клиентов' },
      ],
    },
    {
      id: 10,
      title: 'Выполнено',
      items: [
        { id: 28, title: 'Завершить задачи', body: 'Завершить все назначенные задачи' },
        { id: 29, title: 'Отправить отчет', body: 'Отправить отчет руководству' },
        { id: 30, title: 'Получить отпуск', body: 'Подготовить документы для отпуска' },
      ],
    },
    {
      id: 11,
      title: 'Готово',
      items: [
        { id: 31, title: 'Завершить проект', body: 'Завершить текущий проект' },
        { id: 32, title: 'Опубликовать статью', body: 'Опубликовать статью на сайте' },
        { id: 33, title: 'Провести собрание', body: 'Провести собрание с командой' },
      ],
    },
    {
      id: 12,
      title: 'Завершено',
      items: [
        { id: 34, title: 'Завершить работу', body: 'Завершить текущую работу' },
        { id: 35, title: 'Сдать задание', body: 'Сдать задание преподавателю' },
        { id: 36, title: 'Написать текст', body: 'Написать текст для публикации' },
      ],
    },
  ]);

  const dragStartHandler = (item: BoardItem) => {
    setCurrentItem(item);
  };

  const dragEndHandler = () => {
    setCurrentItem(null);
  };

  const dragOverHandler = (e: React.DragEvent, board: Board) => {
    e.preventDefault();
  };

  const dragHandler = (e: React.DragEvent, board: Board, item: BoardItem) => {
    e.preventDefault();

    if (currentItem) {
      const currentIndex = currentBoard?.items.indexOf(currentItem);
      if (currentIndex !== undefined && currentIndex !== -1) {
        currentBoard?.items.splice(currentIndex, 1);
      }

      if (currentBoard && currentBoard !== board && currentItem.boardTitle === board.title) {
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
      }

      setBoards((prevBoards) =>
        prevBoards.map((b) => (b.id === board.id ? board : b))
      );
    }
  };

  const dropCardHandler = (board: Board) => {
    if (currentItem) {
      board.items.push(currentItem);

      if (currentBoard) {
        const currentIndex = currentBoard.items.indexOf(currentItem);
        if (currentIndex !== undefined && currentIndex !== -1) {
          currentBoard.items.splice(currentIndex, 1);
        }
      }

      setBoards((prevBoards) =>
        prevBoards.map((b) => (b.id === board.id ? board : b))
      );
    }
  };

  const deleteCardHandler = (board: Board, item: BoardItem) => {
    board.items = board.items.filter((i) => i.id !== item.id);
    setBoards((prevBoards) => prevBoards.map((b) => (b.id === board.id ? board : b)));
  };

  return (
    <div className="flex items-start grid-cols-12 gap-4 min-w-max min-h-[400px] border-2 border-lime-500 bg-yellow-100 py-5 px-3 rounded-xl m-3">
      {boards.map((board) => (
        <div
          key={board.id}
          onDragOver={(e) => dragOverHandler(e, board)}
          onDrop={() => dropCardHandler(board)}
        >
          <div className="block text-sm font-semibold">{board.title}</div>
          {board.items.map((item) => (
            <EditableCard
              key={item.id}
              title={item.title}
              body={item.body}
              columns={1}
              onDragStart={() => dragStartHandler(item)}
              onDelete={() => deleteCardHandler(board, item)}
              boardTitle={board.title}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
