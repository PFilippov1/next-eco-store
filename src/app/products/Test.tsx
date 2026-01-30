'use client';
import { useActionState } from 'react';
import { createComment } from './actions';

interface CommentData {
  id: number;
  comment: string | null;
}

type ActionState = 
  | { success: true; data: CommentData; error?: never }
  | { success: false; error: string; data?: never }
  | null;

export default function Test() {
  const action = async (
    prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    return await createComment(formData) as ActionState;
  };

  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <div className="mt-4">
      <form action={formAction} className="flex flex-col gap-2">
        <label htmlFor="comment-input" className="text-sm font-medium">
          Your comment
        </label>
        <input
          id="comment-input"
          type="text"
          name="comment"
          placeholder="Write a comment"
          className="border p-2 rounded text-black"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isPending ? 'Saving...' : 'Send'}
        </button>
      </form>

      {state?.success && state.data && (
        <p className="text-green-500 mt-2">
          ✅ Comment &quot;{state.data.comment}&quot; added!
        </p>
      )}
      
      {state?.error && <p className="text-red-500 mt-2">❌ {state.error}</p>}
    </div>
  );
}
