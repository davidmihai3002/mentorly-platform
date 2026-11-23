import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { INITIAL_STUDENT } from '../constants'
import { studentSchema } from '../schemas'
import type { StudentDetails } from '../types'

export function useStudentProfile() {
  const [details, setDetails] = useState<StudentDetails>(INITIAL_STUDENT)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const form = useForm<StudentDetails>({ resolver: zodResolver(studentSchema), values: details })

  function startEditing() {
    setIsSaved(false)
    setIsEditing(true)
  }

  function cancelEditing() {
    form.reset(details)
    setIsEditing(false)
  }

  const save = form.handleSubmit((values) => {
    setDetails(values)
    setIsEditing(false)
    setIsSaved(true)
  })

  return { details, form, isEditing, isSaved, startEditing, cancelEditing, save }
}
