import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import List from './List';

const renderList = (tasks) => {
  const handleDelete = jest.fn();
  const { container, getByText } = render(
    <List
      tasks={tasks}
      onClickDelete={handleDelete}
    />,
  );

  return {
    handleDelete,
    container,
    getByText,
  };
};

describe('', () => {
  test('비어있는 tasks 배열 화면 출력 검사', () => {
    const tasks = [];
    const { container } = renderList(tasks);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('데이터가 있는 tasks 배열 화면 출력 검사', () => {
    const tasks = [
      {
        id: 100,
        title: '통과하지 못하는 테스트 작성(RED)',
      },
      {
        id: 101,
        title: '테스트를 통과하는 코드 작성(GREEN)',
      },
      {
        id: 102,
        title: '결과 코드를 깔끔하게 리팩터링(REFACTORING)',
      },
    ];
    const { container } = renderList(tasks);

    tasks.forEach((task) => {
      expect(container).toHaveTextContent(task.title);
      expect(container).toHaveTextContent('완료');
    });
  });

  test('handleDelete 이벤트 검사', () => {
    const tasks = [
      {
        id: 100,
        title: 'handleDelete 이벤트',
      },
    ];
    const { handleDelete, getByText } = renderList(tasks);
    const button = getByText('완료');

    expect(handleDelete).not.toBeCalled();

    fireEvent.click(button);

    expect(handleDelete).toBeCalled();
  });
});