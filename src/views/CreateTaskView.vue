<template>
  <PageFrame no-nav>
    <template #actions>
      <IconButton icon="pi-arrow-left" @click="router.push({ name: 'tasks' })" />
    </template>
    <template #default>
      <div class="flex flex-col h-full p-4 gap-4">
        <div class="flex gap-1">
          <span class="font-bold w-38">Task Name:</span>
          <InputText
            class="grow bg-dark px-2 rounded-l-1 caret-white/80 max-w-100"
            type="text"
            v-model="taskName"
            unstyled
          />
        </div>
        <div class="flex gap-1">
          <span class="font-bold w-38">File:</span>
          <FileUpload
            :chooseButtonProps="{
              unstyled: true,
              class:
                'flex gap-1 items-center py-1 px-2 rounded-2 transition-colors-150 bg-blue enabled:(hover:bg-blue/80 active:!bg-blue/60) text-white',
            }"
            ref="fileupload"
            mode="basic"
            @select="onSelect"
            custom-upload
          />
        </div>
        <div class="flex gap-1">
          <span class="font-bold w-38">File:</span>
          <Select
            v-model="selectedType"
            :options="workerTypes"
            optionLabel="Worker Type"
            placeholder="Select a Worker Type"
            class="grow max-w-100"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center gap-1">
                {{ slotProps.value.task_type }}<sub>{{ slotProps.value.version }}</sub>
              </div>
              <span v-else>{{ slotProps.placeholder }} </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center gap-1 w-full">
                {{ slotProps.option.task_type }}<sub>{{ slotProps.option.version }}</sub>
                <span class="grow" />
                <span v-if="slotProps.selected" class="pi pi-check" />
              </div>
            </template>
          </Select>
        </div>
        <div class="flex gap-1">
          <Button
            class="flex gap-1 items-center py-1 px-2 rounded-2 transition-colors-150 bg-blue enabled:(hover:bg-blue/80 active:!bg-blue/60) text-white"
            label="Submit"
            :loading="submitting"
            @click="submit"
            unstyled
          />
        </div>
      </div>
    </template>
  </PageFrame>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Button from 'primevue/button'
import Select from 'primevue/select'
import IconButton from '@/components/IconButton.vue'
import PageFrame from '@/components/PageFrame.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { createTrainingTask, getWorkersSummary } from '@/libs/apis/apis'
import { delay } from '@/libs/utils'
import { useTasks } from '@/composables/taskData'

const router = useRouter()
const taskData = useTasks()
const taskName = ref('')
const file = ref<File>()
const submitting = ref(false)

type WorkerType = {
  task_type: string
  version: string
}

const workerTypes = ref<WorkerType[]>([])
const selectedType = ref<WorkerType>()

async function loadWorkerTypes() {
  const workers = await getWorkersSummary()
  const types = new Map<string, WorkerType>()
  workers.forEach((worker) => {
    const key = `${worker.task_type}_${worker.version}`
    if (types.has(key)) return
    types.set(key, { task_type: worker.task_type, version: worker.version })
  })

  workerTypes.value = Array.from(types.values())
}

function onSelect(event: FileUploadSelectEvent) {
  file.value = event.files[0]
}

onMounted(async () => {
  await loadWorkerTypes()
})

function validate(): boolean {
  if (taskName.value === '') return false
  if (file.value == null) return false
  if (selectedType.value == null) return false

  return true
}

async function submit() {
  submitting.value = true
  try {
    if (!validate()) {
      // when validate failed
      alert('Missing field values')
      return // leave sumbitting
    }

    const task = await createTrainingTask({
      input_dir: file.value!,
      name: taskName.value,
      task_type: selectedType.value!.task_type,
      version: selectedType.value!.version,
    })
    await taskData.loadTasks()
    await router.replace({ name: 'task-detail', params: { id: task.task_id } })
  } finally {
    submitting.value = false
  }
}
</script>
