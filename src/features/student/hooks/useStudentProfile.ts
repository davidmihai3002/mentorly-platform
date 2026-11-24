import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from '@/session'
import { INITIAL_STUDENT } from '../constants'
import { studentSchema } from '../schemas'
import type { StudentDetails } from '../types'

export function useStudentProfile() {
  const { user } = useSession()
  const [details, setDetails] = useState<StudentDetails>(() => ({
    ...INITIAL_STUDENT,
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
  }))
  const [isEditing, setIsEditing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [hasClosedEditor, setHasClosedEditor] = useState(false)
  const form = useForm<StudentDetails>({ resolver: zodResolver(studentSchema), values: details })

  useEffect(() => {
    if (isEditing) form.setFocus('fullName')
  }, [isEditing, form])

  function startEditing() {
    setIsSaved(false)
    setHasClosedEditor(false)
    setIsEditing(true)
  }

  function cancelEditing() {
    form.reset(details)
    setHasClosedEditor(true)
    setIsEditing(false)
  }

  const save = form.handleSubmit((values) => {
    setDetails(values)
    setHasClosedEditor(true)
    setIsEditing(false)
    setIsSaved(true)
  })

  return { details, form, isEditing, isSaved, hasClosedEditor, startEditing, cancelEditing, save }
}
