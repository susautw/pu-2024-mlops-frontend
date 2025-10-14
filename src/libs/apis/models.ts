export type WorkerSummary = {
  id: string
  task_type: string
  version: string
  healthy: boolean
  has_task: boolean
  joined_at?: Date
  created_at: Date
  reported_at: Date
}

export type TrainingTask = {
  task_id: string
  name: string
  task_type: string
  version: string
  config: object
  created_at: Date
  updated_at?: Date
}
export type TrainingStatus = {
  task_id: string
  phase: string
  progress: number
  description: string
  is_completed: boolean
  updated_at: Date
}
