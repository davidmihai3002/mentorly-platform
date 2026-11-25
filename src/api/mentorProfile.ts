import { request } from './client'
import type { MentorApplicationRequest, MentorApplicationResponse } from './mentorProfile.types'

export function submitMentorApplication(
  body: MentorApplicationRequest,
): Promise<MentorApplicationResponse> {
  return request<MentorApplicationResponse>('/mentor-profile/application', {
    method: 'POST',
    body,
  })
}
