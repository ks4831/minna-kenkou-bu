'use client'

import { signOut } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function SignOutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      await signOut()
      router.push('/')
    })
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
    >
      {isPending ? '...' : 'ログアウト'}
    </button>
  )
}
