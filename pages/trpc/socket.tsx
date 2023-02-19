import { socketTrpc } from '@/lib/trpc';
import React, { useEffect } from 'react';

export default function Socket() {
  useEffect(() => {
    const subscription = socketTrpc.onUpdate.subscribe(undefined, {
      onData: (data) => {
        console.log(data);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        socketTrpc.update.mutate({ text: 'hi' });
      }}
    >
      emit
    </button>
  );
}
