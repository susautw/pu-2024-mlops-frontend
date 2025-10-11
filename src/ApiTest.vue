<script setup lang="ts">
import { onMounted, useTemplateRef, ref } from 'vue'
import {
  createTrainingTask,
  deleteTrainingTaskById,
  getTrainingStatusById,
  getTrainingTaskById,
  getTrainingTasks,
  getWorkersSummary,
  getWorkerSummaryById,
  startTrainingTaskById,
  stopTrainingTaskById,
} from './libs/apis/apis'
import type { TrainingStatus } from './libs/apis/models'

const taskId = 'd6deac5d1fe245de9b5b5db8b4038bf1'
onMounted(async () => {
  // console.log('getWorkersSummary', await getWorkersSummary())
  // console.log(
  //   'getWorkerSummaryById',
  //   await getWorkerSummaryById('c1a4897360a94ffb8fb6dadb83985e3f'),
  // )
  // const tasks = await getTrainingTasks()
  // console.log('getTrainingTasks', tasks)
  // if (tasks.length === 0) {
  //   return
  // }
  // const firstTask = tasks[0]!
  console.log('getTrainingTaskById', await getTrainingTaskById(taskId))
  console.log('getTrainingStatusById', await getTrainingStatusById(taskId))
})
const finputRef = useTemplateRef('finput')
const status = ref<TrainingStatus>()
async function upload() {
  const finputEl = finputRef.value
  if (finputEl == null || finputEl.files?.[0] == null) return

  const file = finputEl.files[0]
  console.log(file)

  const createdTask = await createTrainingTask({
    name: 'test',
    task_type: 'classification',
    version: '1.0.0',
    input_dir: file,
  })
  console.log(createdTask)
}

async function start() {
  console.log('startTrainingTaskById', await startTrainingTaskById(taskId))
}

async function stop() {
  console.log('startTrainingTaskById', await stopTrainingTaskById(taskId))
}

async function deleteTask() {
  console.log('startTrainingTaskById', await deleteTrainingTaskById(taskId))
}

async function printStatus() {
  const status_ = await getTrainingStatusById(taskId)
  console.log('geById', status_)
  status.value = status_
}
</script>

<template>
  <input ref="finput" type="file" /><br />
  <button @click="upload()">OK</button><br />
  <button @click="start()">Start</button><br />
  <button @click="stop()">Stop</button><br />
  <button @click="printStatus()">Show status</button><br />
  <button @click="deleteTask()">delete</button><br />

  <div>{{ status }}</div>
</template>

<style scoped></style>
