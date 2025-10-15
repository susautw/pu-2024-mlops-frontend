import type { TrainingStatus, TrainingTask, WorkerSummary } from './models'

export async function getWorkersSummary(): Promise<WorkerSummary[]> {
  const response = await fetch(`/api/v1/workers/summary`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return (data.workers as object[]).map(toWorkerSummary)
}

export async function getWorkerSummaryById(id: string): Promise<WorkerSummary> {
  const response = await fetch(`/api/v1/workers/${id}/summary`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return toWorkerSummary(data)
}

export async function getTrainingTasks(): Promise<TrainingTask[]> {
  const response = await fetch(`/api/v1/training-tasks`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return (data as object[]).map(toTrainingTask)
}

export async function getTrainingTaskById(id: string): Promise<TrainingTask> {
  const response = await fetch(`/api/v1/training-tasks/${id}`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return toTrainingTask(data)
}

export async function getTrainingStatusById(id: string): Promise<TrainingStatus> {
  const response = await fetch(`/api/v1/training-tasks/${id}/status`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return toTrainingStatus(data)
}

export function getTaskDownloadUrl(id: string): string {
  return `/api/v1/training-tasks/${id}/artifacts`
}
export type StartTrainingTaskResponse = {
  task_id: string
  worker: WorkerSummary
}
export async function startTrainingTaskById(id: string): Promise<StartTrainingTaskResponse> {
  const response = await fetch(`/api/v1/training-tasks/${id}/start`, { method: 'POST' })
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return {
    task_id: data.task_id,
    worker: toWorkerSummary(data.worker),
  }
}
export type StopTrainingTaskResponse = {
  task_id: string
}
export async function stopTrainingTaskById(id: string): Promise<StopTrainingTaskResponse> {
  const response = await fetch(`/api/v1/training-tasks/${id}/pause`, { method: 'POST' })
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return {
    task_id: data.task_id,
  }
}

export async function deleteTrainingTaskById(id: string): Promise<void> {
  const response = await fetch(`/api/v1/training-tasks/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
}

export type CreateTaskOptions = {
  name: string
  task_type: string
  version: string
  config?: object
  input_dir: File
}

export async function createTrainingTask(options: CreateTaskOptions): Promise<TrainingTask> {
  const formData = new FormData()
  formData.append('name', options.name)
  formData.append('task_type', options.task_type)
  formData.append('version', options.version)
  if (options.config != null) {
    formData.append('config', JSON.stringify(options.config))
  }
  formData.append('input_dir', options.input_dir, options.input_dir.name)

  const response = await fetch(`/api/v1/training-tasks`, { method: 'POST', body: formData })
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  return toTrainingTask(data)
}

function toWorkerSummary(data: any): WorkerSummary {
  return {
    id: data.id,
    task_type: data.task_type,
    version: data.version,
    healthy: data.healthy,
    has_task: data.has_task,
    joined_at: data.joined_at != null ? new Date(data.joined_at) : undefined,
    created_at: new Date(data.created_at),
    reported_at: new Date(data.reported_at),
  }
}
function toTrainingTask(data: any): TrainingTask {
  return {
    task_id: data.task_id,
    name: data.name,
    task_type: data.task_type,
    version: data.version,
    config: data.config,
    created_at: new Date(data.created_at),
    updated_at: data.updated_at != null ? new Date(data.updated_at) : undefined,
  }
}
function toTrainingStatus(data: any): TrainingStatus {
  return {
    task_id: data.task_id,
    phase: data.phase,
    progress: data.progress,
    description: data.description,
    is_completed: data.is_completed,
    updated_at: new Date(data.updated_at),
  }
}
