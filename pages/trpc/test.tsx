import { trpc } from '@/lib/trpc';
import React, { useState } from 'react';

export default function Test() {
  const [content, setContent] = useState('');
  const hello = trpc.hello.useQuery({ text: 'client' });
  const todolist = trpc.getTodo.useQuery();
  const { getTodo } = trpc.useContext();
  const { mutate: addTodo } = trpc.addTodo.useMutation({
    onSuccess: () => {
      setContent('');
      getTodo.invalidate();
    },
  });

  const onAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      content,
    });
  };

  if (hello.isLoading || todolist?.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{hello.data?.greeting}</p>
      {todolist?.data?.map((todo, index) => (
        <p key={index}>{todo}</p>
      ))}
      <form onSubmit={onAdd}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}
