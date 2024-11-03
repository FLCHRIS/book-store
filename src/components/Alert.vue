<script setup>
import AlertIcon from "../icons/AlertIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: "info",
  },
  message: {
    type: String,
    required: true,
  },
  handleClose: {
    type: Function,
    required: true,
  },
});

const typeAlerts = {
  info: "bg-blue-50 text-blue-800 border-blue-300",
  danger: "bg-red-50 text-red-800 border-red-300",
  success: "bg-green-50 text-green-800 border-green-300",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
};

const hoverClasses = {
  info: "hover:bg-blue-200 focus:ring-blue-200",
  danger: "hover:bg-red-200 focus:ring-red-200",
  success: "hover:bg-green-200 focus:ring-green-200",
  warning: "hover:bg-yellow-200 focus:ring-yellow-200",
};

const title = {
  info: "Info",
  danger: "Error",
  success: "Success",
  warning: "Warning",
};
</script>

<template>
  <div
    id="alert-additional-content-1"
    :class="`relative p-3 mb-3 border rounded-lg ${typeAlerts[props.type]}`"
    role="alert"
  >
    <div class="flex items-center">
      <AlertIcon styles="flex-shrink-0 inline size-5 me-1" />
      <span class="sr-only">{{ props.type }}</span>
      <h3 class="text-lg font-medium">{{ title[props.type] }}</h3>
    </div>
    <div class="mt-2 text-sm">
      {{ props.message }}
    </div>
    <button
      @click="props.handleClose"
      type="button"
      aria-label="Close"
      :class="`absolute right-2 top-2 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs p-1 text-center ${
        hoverClasses[props.type]
      }`"
    >
      <CloseIcon styles="size-5" />
    </button>
  </div>
</template>
