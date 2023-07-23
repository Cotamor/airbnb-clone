'use client'

import EmptyState from '@/components/empty-state'
import { useEffect } from 'react'

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error)
  }, [error])
  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />
}
export default ErrorState
